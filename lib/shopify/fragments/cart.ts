import gql from "graphql-tag";

export const cartFragment = gql`
  fragment cartFragment on Cart {
    id
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    checkoutUrl
    lines(first: 10) {
      edges {
        node {
          id
          merchandise {
            ... on ProductVariant {
              id
              availableForSale
              currentlyNotInStock
              compareAtPrice {
                amount
                currencyCode
              }
              price {
                amount
                currencyCode
              }
              image {
                altText
                url
              }
              product {
                title
              }
              selectedOptions {
                name
                value
              }
            }
          }
          quantity
          estimatedCost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
