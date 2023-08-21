import { ISearchFlightForm } from "./searchFlight";
import { FlightDetailItemType } from "../ticket";
import { TripType } from "@/constants/enum";
export interface IFlightBookingInfo {
  bookingInfo: Partial<ISearchFlightForm>;
  flightDepart?: {
    tid: string;
    outbound: FlightDetailItemType;
  };
  flightReturn?: {
    tid: string;
    outbound: FlightDetailItemType;
  };
  passengersInfo: {};
}

export const bookingInitialState: IFlightBookingInfo = {
  bookingInfo: {},
  flightDepart: undefined,
  flightReturn: undefined,
  passengersInfo: {},
};
