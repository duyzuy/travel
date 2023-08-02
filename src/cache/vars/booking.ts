import { makeVar } from "@apollo/client";
import { IBookingType, bookingInitialState } from "@/Models/booking";
import { DirectSelectionType } from "../type/booking";
import { Direction } from "@/constants/enum";
export const bookingInformationVar = makeVar<IBookingType>(bookingInitialState);
export const flightDirectionSelectVar = makeVar<DirectSelectionType>({
  selecting: Direction.OUT_BOUND,
});

export const showLuggageVar = makeVar<boolean>(false);
