import { gql } from "@apollo/client";

export const WTIRE_AIRPORT_LIST = gql`
  query WriteAirportList {
    airportList {
      id
      name
      code
      engName
      airportGroupId
      province {
        provinceCode
        provinceName
        provinceEngName
        country {
          id
          status
          countryCode
          countryName
          countryEngName
        }
      }
    }
  }
`;
