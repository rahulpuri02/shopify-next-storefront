import { environment } from "@/environment";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const pinecone = new PineconeClient();

const productsPineconeIndex = pinecone.Index(environment.PINECONE_PRODUCTS_COLLECTIONS_INDEX_NAME);
const storePineconeIndex = pinecone.Index(environment.PINECONE_STORE_INDEX_NAME);

export const productVectorStore = new PineconeStore(embeddings, {
  pineconeIndex: productsPineconeIndex,
  maxConcurrency: 5,
});

export const storeVectorStore = new PineconeStore(embeddings, {
  pineconeIndex: storePineconeIndex,
  maxConcurrency: 5,
});
