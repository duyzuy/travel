import { gql } from "@apollo/client";

export const WTIRE_AIRPORT_LIST = gql`
  query WriteAirportList {
    airportList {
      id
      name
    }
  }
`;
