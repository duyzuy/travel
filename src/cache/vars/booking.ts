import { makeVar } from "@apollo/client";
import { IBookingType, bookingInitialState } from "@/Models/booking";
export const bookingInformationVar = makeVar<IBookingType>(bookingInitialState);
