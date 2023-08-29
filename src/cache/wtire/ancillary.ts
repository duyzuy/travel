import { gql } from "@apollo/client";

export const WRITE_ANCILLARIES = gql`
  query WriteAncillaries($cityPare: String) {
    ancillaries(cityPare: $cityPare) {
      cityPare
      luggages
      meals
    }
  }
`;
