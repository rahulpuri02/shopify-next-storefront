import gql from "graphql-tag";

export const createCustomerMutation = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customerUserErrors {
        message
      }
      customer {
        id
      }
    }
  }
`;

export const customerAccessTokenCreateMutation = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

export const forgotPasswordMutation = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        message
      }
    }
  }
`;

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
