import { gql } from "@apollo/client";

export const DESTINATION_SELECTING = gql`
  mutation TripSelectDestination($data: any) {
    tripSelectDestination(data: $data) @client
  }
`;

export const CHANGE_TRIP_TYPE = gql`
  mutation ChangeTripType($tripType: String!) {
    changeTripType(tripType: $tripType) @client
  }
`;
