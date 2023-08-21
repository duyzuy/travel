import { Airline, Airlines } from "./airline";

export type TicketType = {
  cid: number;
  code: string;
  nameEn: string;
  name: string;
};

export enum Polocies_keys {
  CHANGE_ROUTE = "CHANGE_ROUTE",
  VOID_TICKET = "VOID_TICKET",
  AIRCRAFT_INFO = "AIRCRAFT_INFO",
  LUGGAGE_INFO = "LUGGAGE_INFO",
  OTHERS = "OTHERS",
}
export type TicketDetailType = {
  cid: number;
  providerId: number;
  policy: string | null;
  freeHandBaggage: number;
  freeCheckedBaggage: string | null;
  planeCode: string | null;
  farePrice: number;
  farePriceAdult: number;
  farePriceChild: number;
  priceAdults: number;
  priceChildren: number;
  priceInfants: number;
  priceAdultsWithoutBookerMarkup: number;
  priceChildrenWithoutBookerMarkup: number;
  priceInfantsWithoutBookerMarkup: number;
  priceAdultUnit: number;
  priceChildUnit: number;
  priceInfantUnit: number;
  discountAdultUnit: number;
  discountChildUnit: number;
  discountInfantUnit: number;
  discountAdult: number;
  discountChild: number;
  discountInfant: number;
  priceAdultUnitWithoutBookerMarkup: number;
  priceChildUnitWithoutBookerMarkup: number;
  priceInfantUnitWithoutBookerMarkup: number;
  ticketClassCode: "economy";
  mileAccrualRate: number;
  totalTicketingCharge: number;
  grandTotal: number;
  grandTotalWithoutBookerMarkup: number;
  numStops: number;
  flightChildren: string | null;
  link: string | null;
  holdingTime: number;
  holdingTimeExactly: true;
  additionalInfo: null;
  detailTicketClass: string;
  bonusPoint: number;
  needPassport: boolean;
  additionalPoliciesFetchingSupport: boolean;
  supportsFrequentFlyerNumberInput: boolean;
  buySignals: [];
  polices: { code: Polocies_keys; description: string }[];
  facilities: { code: Polocies_keys; description: string }[];
  bestGroupPriceAdultUnit: number;
  discount: number;
};

export type TicketInforType = {
  aid: number;
  arrivalAirport: string;
  arrivalAirportName: string;
  arrivalCity: string;
  arrivalDayStr: string;
  arrivalTimeStr: string;
  departureAirport: string;
  departureAirportName: string;
  departureCity: string;
  departureDayStr: string;
  departureTimeStr: string;
  detailTicketClass?: string;
  facilities?: { code: string; description: string }[];
  flightDuration: number;
  flightNumber: string;
  marketingAirlineId: number;
  operatingAirlineId: number;
  polices: { code: string; description: string }[];
  ticketClassCode: string;
  transitDuration: number;
};

export type FlightDetailItemType = {
  aid: number;
  departureAirport: string;
  departureCity: string;
  arrivalAirport: string;
  arrivalCity: string;
  departureTime: number;
  departureTimeStr: string;
  departureDayStr: string;
  arrivalTime: number;
  arrivalDayStr: string;
  arrivalTimeStr: string;
  flightNumber: string;
  duration: number;
  matchingGroupId: number;
  departureAirportName: string;
  arrivalAirportName: string;
  fareTypes: {
    [key: string]: {
      name: string;
    };
  };
  seatRemaining: number;
  ticketdetail: TicketDetailType;
  transitTickets?: TicketInforType[];
};
export type AirportType = {
  cityCode: string;
  cityName: string;
  code: string;
  name: string;
  timeZone: string;
};

export type FlightOptionsType = {
  airlines: Airline[];
  airports: { [key: string]: AirportType };
  filters: {
    maxDuration: number;
    maxFarePrice: number;
    maxGroupPrice: number;
    maxPrice: number;
    numStops: [0];
  };
  header: { date: number; bestPrice: number }[];
  inbound: {
    numHighlights: number;
    total: number;
    tickets: { outbound: FlightDetailItemType; tid: string }[];
  };
  outbound: {
    numHighlights: number;
    total: number;
    tickets: { outbound: FlightDetailItemType; tid: string }[];
  };
  polling: boolean;
  routeType: string;
  ticketClasses: { cid: number; code: string; name: string; nameEn: string }[];
  waitFor: string;
};
