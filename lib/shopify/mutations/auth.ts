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
