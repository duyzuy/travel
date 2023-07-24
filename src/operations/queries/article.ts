import { gql } from "@apollo/client";

export const QUERY_ARTICLES_POST = gql`
  query GetAllArticles {
    articles @client {
      id
      name
      thumbnail
    }
  }
`;
