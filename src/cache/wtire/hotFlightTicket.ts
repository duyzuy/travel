import { gql } from "@apollo/client";

export const WRITE_HOT_FLIGHTS_TICKET = gql`
  query WriteHotFlightsTicket {
    hotFlightsTicket {
      airports {
        code
        airportName
        cityName
      }
      airlines
      hotTickets {
        itinerary {
          fromAirport
          toAirport
        }
        priceOptions {
          airlineId
          flightCode
          departureDate
          departureTime
          arrivalDate
          arrivalTime
          duration
          ticketClass
          totalPrice
          farePrice
          discountAdult
          discountChild
          freeCheckedBaggage
          freeHandBaggage
        }
      }
    }
  }
`;
