import gql from "graphql-tag";

export const GET_ALL_PRODUCTS_QUERY = gql`
  query getProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          id
          title
          handle
          description
          tags
          productType
          vendor
          createdAt
          updatedAt
          collections(first: 20) {
            edges {
              node {
                title
              }
            }
          }
          variants(first: 50) {
            edges {
              node {
                id
                title
                image {
                  url
                  altText
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          seo {
            title
            description
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_ALL_COLLECTIONS_QUERY = gql`
  query getCollections($first: Int!, $after: String) {
    collections(first: $first, after: $after) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          updatedAt
          seo {
            title
            description
          }
          products(first: 100) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
