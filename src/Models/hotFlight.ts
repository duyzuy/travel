export type TypeAirportItem = {
  airportName: string;
  cityName: string;
  code: string;
};

export type TypeAirLine = {
  id: number;
  code: string;
  name: string;
  logo: string;
};
export type TypeHotTicketItinerary = {
  fromAirport: string;
  toAirport: string;
};
export type TypeHotTicketPriceOption = {
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
export type TypeHotTicket = {
  itinerary: TypeHotTicketItinerary;
  priceOptions: TypeHotTicketPriceOption[];
};

export type TypeHotTickets = TypeHotTicket[];
