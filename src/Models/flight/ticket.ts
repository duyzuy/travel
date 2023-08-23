import { Police } from "./police";
import { TicketDetail } from "./ticketDetail";
import { FareType } from "./fareType";

import { TransitTiket } from "./transitTicket";
export interface IFlightTicket {
  tid: string;
  outbound: {
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
      [key: string]: FareType;
    };
    seatRemaining: number;
    ticketdetail: TicketDetail;
    transitTickets?: TransitTiket[];
  };
}

export class FlightTicket implements IFlightTicket {
  tid: string;
  outbound: {
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
      [key: string]: FareType;
    };
    seatRemaining: number;
    ticketdetail: TicketDetail;
    transitTickets?: TransitTiket[];
  };

  constructor(
    tid: string,
    outbound: {
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
        [key: string]: FareType;
      };
      seatRemaining: number;
      ticketdetail: TicketDetail;
      transitTickets?: TransitTiket[];
    }
  ) {
    this.tid = tid;
    this.outbound = outbound;
  }
}
