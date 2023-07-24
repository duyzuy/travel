import { gql } from "@apollo/client";

export const WRITE_ARTICLES = gql`
  query WriteArticles {
    articles {
      id
      name
      thumbnail
    }
  }
`;
