import gql from "graphql-tag";
import { productWithImages } from "../fragments/product";

export const getCollectionQuery = gql`
  query getCollection($handle: String!, $productCount: Int!) {
    collection(handle: $handle) {
      title
      description
      descriptionHtml
      products(first: $productCount) {
        edges {
          node {
            ...productWithImages
          }
        }
      }
    }
  }
  ${productWithImages}
`;

export const getCollectionsQuery = gql`
  query getCollections($count: Int!, $key: String!, $namespace: String!) {
    collections(first: $count) {
      edges {
        node {
          id
          handle
          title
          description
          image {
            altText
            url
          }
          metafield(namespace: $namespace, key: $key) {
            key
            value
          }
        }
      }
    }
  }
`;
