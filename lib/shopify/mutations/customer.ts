import gql from "graphql-tag";

export const createCustomerAddressMutation = gql`
  mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
      customerUserErrors {
        message
      }
    }
  }
`;

export const updateCustomerAddressMutation = gql`
  mutation customerAddressUpdate(
    $customerAccessToken: String!
    $address: MailingAddressInput!
    $id: ID!
  ) {
    customerAddressUpdate(customerAccessToken: $customerAccessToken, address: $address, id: $id) {
      customerUserErrors {
        message
      }
    }
  }
`;
