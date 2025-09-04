import MainBanner from "@/components/shared/banners/main-banner";
import HighlightCollections from "@/components/shared/collections/highlight-collections";
import ShowcaseCollection from "@/components/shared/collections/showcase-collection";
import { ROUTES } from "@/constants/routes";
import { COLLECTIONS } from "@/constants/shopify";
import { collectionService } from "@/services/collection.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type ComponentProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: "CN 74® | The Official Online Store",
};

export default async function Home({ searchParams }: ComponentProps) {
  const syclid = (await searchParams)?.syclid;
  if (syclid) return redirect(ROUTES.account);
  const showcaseCollection = await collectionService.getCollection(COLLECTIONS.refreshYourWardrobe);
  return (
    <div className="h-auto max-w-screen">
      <MainBanner />
      <ShowcaseCollection collection={showcaseCollection} />
      <div className="mt-20">
        <HighlightCollections />
      </div>
    </div>
  );
}
