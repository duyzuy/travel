import { makeVar } from "@apollo/client";
import { IFlightBookingInfo, bookingInitialState } from "@/Models";

export const bookingInformationVar =
  makeVar<IFlightBookingInfo>(bookingInitialState);
