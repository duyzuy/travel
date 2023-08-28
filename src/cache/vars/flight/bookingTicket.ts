import { makeVar } from "@apollo/client";
import { FlightBookingInformation } from "@/modules/bookingTicket/bookingInformation.interface";
import { GENDER, PASSENGER_TITLE } from "@/constants/enum";

const bookingInformationInit = new FlightBookingInformation(
  {},
  undefined,
  undefined,
  {
    title: PASSENGER_TITLE.MR,
    contactEmail: "",
    contactFirstName: "",
    contactGender: GENDER.FEMALE,
    contactLastName: "",
    contactPhone: "",
    passengers: [],
  },
  {
    seats: {},
    luggages: {},
    meals: {},
    insurrance: {},
  }
);

export const bookingInformationVar = makeVar<FlightBookingInformation>(
  bookingInformationInit
);
