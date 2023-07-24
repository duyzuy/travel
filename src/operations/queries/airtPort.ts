import { gql } from "@apollo/client";

export const QUERY_AIRPORT_LIST = gql`
  query GetAllAirports {
    airportList @client {
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
