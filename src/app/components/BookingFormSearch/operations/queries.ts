import { gql } from "@apollo/client";
export const QUERY_BOOING_INFORMATION = gql`
  query BookingInformation {
    bookingInformation @client
  }
`;

export const QUERY_AIRPORT_LIST = gql`
  query GetAllAirports {
    airportList @client
  }
`;
