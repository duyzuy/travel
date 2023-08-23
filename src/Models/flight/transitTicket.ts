import { Police } from "./police";
export interface ITransitTicket {
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
  facilities?: Police[];
  flightDuration: number;
  flightNumber: string;
  marketingAirlineId: number;
  operatingAirlineId: number;
  polices: Police[];
  ticketClassCode: string;
  transitDuration: number;
}

export class TransitTiket implements ITransitTicket {
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
  facilities?: Police[];
  flightDuration: number;
  flightNumber: string;
  marketingAirlineId: number;
  operatingAirlineId: number;
  polices: Police[];
  ticketClassCode: string;
  transitDuration: number;

  constructor(
    aid: number,
    arrivalAirport: string,
    arrivalAirportName: string,
    arrivalCity: string,
    arrivalDayStr: string,
    arrivalTimeStr: string,
    departureAirport: string,
    departureAirportName: string,
    departureCity: string,
    departureDayStr: string,
    departureTimeStr: string,
    detailTicketClass: string,
    facilities: Police[],
    flightDuration: number,
    flightNumber: string,
    marketingAirlineId: number,
    operatingAirlineId: number,
    polices: Police[],
    ticketClassCode: string,
    transitDuration: number
  ) {
    this.aid = aid;
    this.arrivalAirport = arrivalAirport;
    this.arrivalAirportName = arrivalAirportName;
    this.arrivalCity = arrivalCity;
    this.arrivalDayStr = arrivalDayStr;
    this.arrivalTimeStr = arrivalTimeStr;
    this.departureAirport = departureAirport;
    this.departureAirportName = departureAirportName;
    this.departureCity = departureCity;
    this.departureDayStr = departureDayStr;
    this.departureTimeStr = departureTimeStr;
    this.detailTicketClass = detailTicketClass;
    this.facilities = facilities;
    this.flightDuration = flightDuration;
    this.flightNumber = flightNumber;
    this.marketingAirlineId = marketingAirlineId;
    this.operatingAirlineId = operatingAirlineId;
    this.polices = polices;
    this.ticketClassCode = ticketClassCode;
    this.transitDuration = transitDuration;
  }
}
