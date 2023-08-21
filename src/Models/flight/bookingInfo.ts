import { ISearchFlightForm } from "./searchFlight";
import { FlightDetailItemType } from "../ticket";
import { TripType } from "@/constants/enum";
export interface IFlightBookingInfo {
  bookingInfo: Partial<ISearchFlightForm>;
  flightItems: {
    outbound?: { tid: string; outbound: FlightDetailItemType };
    inbound?: { tid: string; outbound: FlightDetailItemType };
  };
  passengersInfo: {};
}

export const bookingInitialState: IFlightBookingInfo = {
  bookingInfo: {},
  flightItems: {},
  passengersInfo: {},
};
