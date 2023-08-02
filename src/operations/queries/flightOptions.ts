import { gql } from "@apollo/client";

export const GET_FLIGHT_OPTIONS = gql`
  query GetFlightOptions {
    flightOptions {
      ticketClasses
      header
      filters
      airlines
      airports
      outbound
      inbound
      routeType
      polling
      waitFor
    }
  }
`;
