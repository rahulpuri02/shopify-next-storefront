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

export const updateCartMutation = gql`
  mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cartFragment
      }
    }
  }
  ${cartFragment}
`;

export const removeFromCartMutation = gql`
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cartFragment
      }
    }
  }
  ${cartFragment}
`;
