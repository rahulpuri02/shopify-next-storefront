import { SHOPIFY_CUSTOM_METAFIELDS } from "@/constants/shopify";
import { collectionService } from "@/services/collection.service";
import React from "react";
async function HighlightCollections() {
  await collectionService.getCollections({
    key: SHOPIFY_CUSTOM_METAFIELDS.collections.homepageType.key,
    value: SHOPIFY_CUSTOM_METAFIELDS.collections.homepageType.values.highlights,
  });

  return <div>HighlightCollections</div>;
}

export default HighlightCollections;
