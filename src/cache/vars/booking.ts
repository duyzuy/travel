import { makeVar } from "@apollo/client";
import {
  IBookingType,
  bookingInitialState,
  bookingFormInitialState,
  BookingFormType,
} from "@/Models/booking";
import { DirectSelectionType } from "../type/booking";
import { Direction } from "@/constants/enum";
export const bookingInformationVar = makeVar<IBookingType>(bookingInitialState);
export const bookingFormFlightVar = makeVar<BookingFormType>(
  bookingFormInitialState
);

export const flightDirectionSelectVar = makeVar<DirectSelectionType>({
  selecting: Direction.OUT_BOUND,
});

export const showLuggageVar = makeVar<boolean>(false);
