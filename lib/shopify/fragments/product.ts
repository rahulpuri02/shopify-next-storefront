import gql from "graphql-tag";

export const productFragment = gql`
  fragment productFragment on Product {
    id
    title
    description
    handle
    featuredImage {
      url
      altText
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    tags
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
  }
`;

export const productWithImages = gql`
  fragment productWithImages on Product {
    ...productFragment
    images(first: 50) {
      edges {
        node {
          url
          altText
        }
      }
    }
  }
  ${productFragment}
`;
