import ExploreBanner from "@/components/shared/banners/explore-banner";
import HighlightCollections from "@/components/shared/collections/highlight-collections";
import MainBanner from "@/components/shared/banners/main-banner";
import { COLLECTIONS } from "@/constants/shopify";
import { collectionService } from "@/services/collection.service";
import ShowcaseCollection from "@/components/shared/collections/showcase-collection";

export default async function Home() {
  const showcaseCollection = await collectionService.getCollection(COLLECTIONS.refreshYourWardrobe);
  return (
    <div className="h-auto max-w-screen">
      <MainBanner />
      <ShowcaseCollection collection={showcaseCollection} />
      <div className="mt-20">
        <HighlightCollections />
        <ExploreBanner />
      </div>
    </div>
  );
}
