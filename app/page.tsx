import MainBanner from "@/components/shared/main-banner";
import ShowcaseCollection from "@/components/shared/showcase-collection";
import { COLLECTIONS } from "@/constants/shopify";
import { collectionService } from "@/services/collection.service";

export default async function Home() {
  const showcaseCollection = await collectionService.getCollection(COLLECTIONS.refreshYourWardrobe);
  return (
    <div className="h-auto max-w-screen">
      <MainBanner />
      <ShowcaseCollection collection={showcaseCollection} />
    </div>
  );
}
