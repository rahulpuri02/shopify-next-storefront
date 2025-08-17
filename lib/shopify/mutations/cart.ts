import gql from "graphql-tag";
import { cartFragment } from "../fragments/cart";

export const createCartMutation = gql`
  mutation createCart {
    cartCreate {
      cart {
        ...cartFragment
      }
    }
  }
  ${cartFragment}
`;

export const addToCartMutation = gql`
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cartFragment
      }
    }
  }
  ${cartFragment}
`;
