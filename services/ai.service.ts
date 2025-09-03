import { environment } from "@/environment";
import { productVectorStore, storeVectorStore } from "@/lib/ai/client";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_ALL_COLLECTIONS_QUERY, GET_ALL_PRODUCTS_QUERY } from "@/lib/shopify/queries/ai";
import type { ShopifyCollection, ShopifyProduct } from "@/types/ai";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { print } from "graphql";

class AIService {
  private readonly BATCH_SIZE = 50;
  private readonly VECTOR_BATCH_SIZE = 20;
  private readonly CHUNK_SIZE = 500;
  private readonly CHUNK_OVERLAP = 100;
  private splitter: RecursiveCharacterTextSplitter;

  constructor() {
    this.splitter = new RecursiveCharacterTextSplitter({
      chunkSize: this.CHUNK_SIZE,
      chunkOverlap: this.CHUNK_OVERLAP,
    });
  }

  async syncAllData(): Promise<void> {
    try {
      await this.clearVectorStore();
      await this.syncProducts();
      await this.syncCollections();
    } catch (error) {
      console.error("Error during syncAllData:", error);
    }
  }

  async syncProducts(): Promise<void> {
    let hasNextPage = true;
    let cursor: string | null = null;

    while (hasNextPage) {
      const response: any = await shopifyFetch({
        query: print(GET_ALL_PRODUCTS_QUERY),
        // @ts-expect-error
        variables: { first: this.BATCH_SIZE, ...(cursor && { after: cursor }) },
      });

      const { products } = response.body.data;
      const productNodes = products.edges.map((e: any) => e.node) as ShopifyProduct[];

      if (productNodes.length > 0) {
        const docs: Document[] = [];
        for (const p of productNodes) {
          docs.push(...(await this.createProductChunks(p)));
        }
        await this.addDocumentsToVectorStore(docs);
      }

      hasNextPage = products.pageInfo.hasNextPage;
      cursor = products.pageInfo.endCursor;
    }
  }

  async syncCollections(): Promise<void> {
    let hasNextPage = true;
    let cursor: string | null = null;

    while (hasNextPage) {
      const response: any = await shopifyFetch({
        query: print(GET_ALL_COLLECTIONS_QUERY),
        // @ts-expect-error
        variables: { first: this.BATCH_SIZE, ...(cursor && { after: cursor }) },
      });

      const { collections } = response.body.data;
      const collectionNodes = collections.edges.map((e: any) => e.node) as ShopifyCollection[];

      if (collectionNodes.length > 0) {
        const docs: Document[] = [];
        for (const c of collectionNodes) {
          docs.push(...(await this.createCollectionChunks(c)));
        }
        await this.addDocumentsToVectorStore(docs);
      }

      hasNextPage = collections.pageInfo.hasNextPage;
      cursor = collections.pageInfo.endCursor;
    }
  }

  private async createProductChunks(product: ShopifyProduct): Promise<Document[]> {
    const docs: Document[] = [];
    const variants = product.variants.edges.map((e) => e.node);
    const images = product.images.edges.map((e) => e.node);

    const baseMetadata = {
      productId: product.id,
      title: product.title,
      handle: product.handle,
      productType: product.productType,
      vendor: product.vendor,
      tags: product.tags,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      url: `${environment.LIVE_STORE_DOMAIN}/products/${product.handle}`,
      availableForSale: variants.some((v) => v.availableForSale),
      collections: product.collections.edges.map((c) => c.node.title),
      type: "product",
    };

    const overview = `${product.title} — ${product.productType} by ${product.vendor}. Tags: ${product.tags?.join(", ") || "none"}. Starting price: ${variants[0]?.price?.amount || "0"} ${variants[0]?.price?.currencyCode || "USD"}. url: ${baseMetadata.url}, productId: ${product.id}`;
    docs.push(
      new Document({ pageContent: overview, metadata: { ...baseMetadata, chunkType: "overview" } })
    );

    if (product.description && product.description.trim()) {
      const descText = `${product.title}: ${product.description}`;
      const descChunks = await this.splitText(descText);
      descChunks.forEach((chunk, i) =>
        docs.push(
          new Document({
            pageContent: chunk,
            metadata: { ...baseMetadata, chunkType: "description", chunkIndex: i },
          })
        )
      );
    }

    if (variants.length > 0) {
      const vText = `${product.title} variants: ${variants
        .map(
          (v) =>
            `${v.title} — ${v.price?.amount ?? "0"} ${v.price?.currencyCode ?? "USD"}${v.availableForSale ? " (in stock)" : ""}}`
        )
        .join("; ")}`;
      const variantChunks = await this.splitText(vText);
      variantChunks.forEach((chunk, i) =>
        docs.push(
          new Document({
            pageContent: chunk,
            metadata: { ...baseMetadata, chunkType: "variants", chunkIndex: i },
          })
        )
      );
    }

    const altTexts = images.map((img) => img.altText).filter(Boolean);
    if (altTexts.length) {
      docs.push(
        new Document({
          pageContent: `${product.title} images: ${altTexts.join(" | ")}`,
          metadata: { ...baseMetadata, chunkType: "images" },
        })
      );
    }

    return docs;
  }

  private async createCollectionChunks(collection: ShopifyCollection): Promise<Document[]> {
    const docs: Document[] = [];
    const products = collection.products.edges.map((p) => p.node);

    const baseMetadata = {
      collectionId: collection.id,
      title: collection.title,
      handle: collection.handle,
      updatedAt: collection.updatedAt,
      url: `/collections/${collection.handle}`,
      productCount: products.length,
      type: "collection",
    };

    docs.push(
      new Document({
        pageContent: `Collection: ${collection.title}. Contains ${products.length} products. url: ${environment.LIVE_STORE_DOMAIN}/collections/${collection.handle} collectionId: ${collection.id}`,
        metadata: { ...baseMetadata, chunkType: "overview" },
      })
    );

    if (collection.description && collection.description.trim()) {
      const descChunks = await this.splitText(
        `${collection.title} collection: ${collection.description}`
      );
      descChunks.forEach((chunk, i) =>
        docs.push(
          new Document({
            pageContent: chunk,
            metadata: { ...baseMetadata, chunkType: "description", chunkIndex: i },
          })
        )
      );
    }

    if (products.length > 0) {
      const productListText = `${collection.title} includes: ${products.map((p) => p.title).join(", ")}`;
      const listChunks = await this.splitText(productListText);
      listChunks.forEach((chunk, i) =>
        docs.push(
          new Document({
            pageContent: chunk,
            metadata: { ...baseMetadata, chunkType: "products", chunkIndex: i },
          })
        )
      );
    }

    return docs;
  }

  private async splitText(text: string): Promise<string[]> {
    if (!text || text.trim().length === 0) return [];
    const chunks = await this.splitter.splitText(text);
    return chunks.filter((c) => c && c.trim().length > 20);
  }

  private async addDocumentsToVectorStore(documents: Document[]): Promise<void> {
    for (let i = 0; i < documents.length; i += this.VECTOR_BATCH_SIZE) {
      const batch = documents.slice(i, i + this.VECTOR_BATCH_SIZE);
      await productVectorStore.addDocuments(batch);
    }
  }

  async clearVectorStore(): Promise<void> {
    await productVectorStore.delete({ deleteAll: true });
  }

  async retrieveContext(intent: "products-and-collections" | "store-info", query: string) {
    const vs = intent === "store-info" ? storeVectorStore : productVectorStore;
    const similarResultCount = intent === "store-info" ? 3 : 5;
    const docs = await vs.similaritySearch(query, similarResultCount);
    if (!docs?.length) return "";
    return docs
      .map((d, i) => {
        return `#${i + 1}\n${d.pageContent}\nSOURCE: ${JSON.stringify(d.metadata, null, 2)}`;
      })
      .join("\n\n---\n\n");
  }
}

export const aiService = new AIService();
