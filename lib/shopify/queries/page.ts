import gql from "graphql-tag";

export const getPageQuery = gql`
  query getPageByHandle($handle: String!) {
    pageByHandle(handle: $handle) {
      id
      title
      handle
      body
      bodySummary
      seo {
        title
        description
      }
    }
  }
`;
