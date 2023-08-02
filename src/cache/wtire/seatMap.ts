import { gql } from "@apollo/client";

export const WRITE_SEAT_MAP = gql`
  query WriteSeatMapModel($model: String) {
    seatMapModel(model: $model) {
      model
      id
      href
      key
      flightSegment {
        flight
        flightLegs
      }
      seatMap {
        key
        name
        aircraftModel {
          href
          key
          identifier
          name
        }
        openSeating
        false
      }
      seatOptions
    }
  }
`;
