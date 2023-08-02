import { gql } from "@apollo/client";

export const READ_SEAT_MAP = gql`
  query ReadSeatMap($model: String) {
    seatMapModel(model: $model) {
      model
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
