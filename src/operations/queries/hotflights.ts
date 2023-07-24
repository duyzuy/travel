import { gql } from "@apollo/client";

export const GET_HOT_FLIGHTS_TICKET = gql`
  query GetHotFlightsTicket {
    hotFlightsTicket @client {
      airports
      airlines
      hotTickets
    }
  }
`;
