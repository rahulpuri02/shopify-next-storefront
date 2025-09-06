import gql from "graphql-tag";
import { productWithImages } from "../fragments/product";

export const getProductQuery = gql`
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...productWithImages
    }
  }
  ${productWithImages}
`;

export const getProductRecommendationsQuery = gql`
  query getProductRecommendations($productHandle: String) {
    productRecommendations(productHandle: $productHandle) {
      ...productWithImages
    }
  }
  ${productWithImages}
`;

export const getSearchResultsQuery = gql`
  query getSearchResults($first: Int!, $query: String!) {
    products(query: $query, first: $first) {
      edges {
        node {
          ...productWithImages
        }
      }
    }
  }
  ${productWithImages}
`;
