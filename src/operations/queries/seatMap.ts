import { gql } from "@apollo/client";

export const QUERY_SEAT_MAP_BY_MODEL = gql`
  query GetSeatMapModel($model: String) {
    seatMapModel(model: $model) @client {
      id
      model
      href
      key
      flightSegment
      seatMap
      seatOptions
    }
  }
`;
