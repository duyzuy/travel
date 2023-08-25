import { makeVar } from "@apollo/client";
import { FlightBookingInformation } from "@/modules/bookingTicket/bookingInformation.interface";

const bookingInformationInit = new FlightBookingInformation(
  {},
  undefined,
  undefined,
  {}
);

export const bookingInformationVar = makeVar<FlightBookingInformation>(
  bookingInformationInit
);
