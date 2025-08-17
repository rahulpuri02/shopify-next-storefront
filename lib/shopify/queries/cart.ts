import gql from "graphql-tag";
import { cartFragment } from "../fragments/cart";

export const getCartQuery = gql`
  query getCart($id: ID!) {
    cart(id: $id) {
      ...cartFragment
    }
  }
  ${cartFragment}
`;
