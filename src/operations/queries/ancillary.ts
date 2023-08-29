import { gql } from "@apollo/client";

export const QUERY_ANCILLARY = gql`
  query GetAncillaries($cityPare: String) {
    ancillaries(cityPare: $cityPare) @client {
      cityPare
      meals
      luggages
    }
  }
`;
