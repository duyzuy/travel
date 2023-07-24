import { gql } from "@apollo/client";

export const WRITE_FLIGHT_OPTIONS = gql`
  query WriteFlightoptions {
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
