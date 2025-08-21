import gql from "graphql-tag";

export const getCustomerQuery = gql`
  query getCustomer($token: String!) {
    customer(customerAccessToken: $token) {
      id
      firstName
      lastName
      acceptsMarketing
      email
      phone
      addresses(first: 10) {
        edges {
          node {
            id
            firstName
            lastName
            address1
            address2
            city
            country
            phone
            zip
          }
        }
      }
    }
  }
`;
