import { FlightTicket } from "./ticket";
import { TicketClass } from "./ticketClass";
import { Airline } from "./airline";
import { Airport } from "./airport";

export interface IFlightOptions {
  airlines: Airline[];
  airports: { [key: string]: Airport };
  filters: {
    maxDuration: number;
    maxFarePrice: number;
    maxGroupPrice: number;
    maxPrice: number;
    numStops: number[];
  };
  header: { date: number; bestPrice: number }[];
  inbound: {
    numHighlights: number;
    total: number;
    tickets: FlightTicket[];
  };
  outbound: {
    numHighlights: number;
    total: number;
    tickets: FlightTicket[];
  };
  polling: boolean;
  routeType: string;
  ticketClasses: TicketClass[];
  waitFor: string;
}

export class FlightOptions implements IFlightOptions {
  airlines: Airline[];
  airports: { [key: string]: Airport };
  filters: {
    maxDuration: number;
    maxFarePrice: number;
    maxGroupPrice: number;
    maxPrice: number;
    numStops: number[];
  };
  header: { date: number; bestPrice: number }[];
  inbound: {
    numHighlights: number;
    total: number;
    tickets: FlightTicket[];
  };
  outbound: {
    numHighlights: number;
    total: number;
    tickets: FlightTicket[];
  };
  polling: boolean;
  routeType: string;
  ticketClasses: TicketClass[];
  waitFor: string;

  constructor(
    airlines: Airline[],
    airports: { [key: string]: Airport },
    filters: {
      maxDuration: number;
      maxFarePrice: number;
      maxGroupPrice: number;
      maxPrice: number;
      numStops: number[];
    },
    header: { date: number; bestPrice: number }[],
    inbound: {
      numHighlights: number;
      total: number;
      tickets: FlightTicket[];
    },
    outbound: {
      numHighlights: number;
      total: number;
      tickets: FlightTicket[];
    },
    polling: boolean,
    routeType: string,
    ticketClasses: TicketClass[],
    waitFor: string
  ) {
    this.airlines = airlines;
    this.airports = airports;
    this.filters = filters;
    this.header = header;
    this.inbound = inbound;
    this.outbound = outbound;
    this.polling = polling;
    this.routeType = routeType;
    this.ticketClasses = ticketClasses;
    this.waitFor = waitFor;
  }
}
