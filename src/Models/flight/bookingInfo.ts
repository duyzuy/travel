import { ISearchFlightForm } from "./searchFlight";
import { FlightTicket } from "./ticket";
export interface IFlightBookingInfo {
  bookingInfo: Partial<ISearchFlightForm>;
  flightDepart?: {
    ticket: FlightTicket;
    others: FlightTicket[];
  };
  flightReturn?: {
    ticket: FlightTicket;
    others: FlightTicket[];
  };
  passengers: {};
}

export const bookingInitialState: IFlightBookingInfo = {
  bookingInfo: {},
  flightDepart: undefined,
  flightReturn: undefined,
  passengers: {},
};
