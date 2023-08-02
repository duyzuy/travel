export type AirportItemType = {
  airportName: string;
  cityName: string;
  code: string;
};

export type ItineraryType = {
  fromAirport: string;
  toAirport: string;
};
export type FlightTicketOption = {
  airlineId: number;
  flightCode: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  duration: number;
  ticketClass: string;
  totalPrice: number;
  farePrice: number;
  discountAdult: number;
  discountChild: number;
  freeHandBaggage: number;
  freeCheckedBaggage: number;
};
export type FlightTicketType = {
  itinerary: ItineraryType;
  priceOptions: FlightTicketOption[];
};

export type FlightTickets = FlightTicketType[];
