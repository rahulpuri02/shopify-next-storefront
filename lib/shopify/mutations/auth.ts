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

export const resetPasswordMutation = gql`
  mutation customerReset($id: ID!, $input: CustomerResetInput!) {
    customerReset(id: $id, input: $input) {
      customerUserErrors {
        message
      }
    }
  }
`;

export const signOutMutation = gql`
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      userErrors {
        message
      }
    }
  }
`;
