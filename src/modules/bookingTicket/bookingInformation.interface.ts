import { ISearchBookingFormValue } from "./searchBookingForm.interface";
import { FlightTicket } from "@/Models/flight/ticket";
import { IPassengerInformationFormValue } from "../passengerInformation/passengerInformation.interface";

export type PassengerInformationBookingType =
  IPassengerInformationFormValue["passengers"][0] & { index: number };

export interface IFlightBookingInformation {
  bookingInfo: Partial<ISearchBookingFormValue>;
  flightDepart?: {
    ticket: FlightTicket;
    others: FlightTicket[];
  };
  flightReturn?: {
    ticket: FlightTicket;
    others: FlightTicket[];
  };
  passengers: PassengerInformationBookingType[];
}

export class FlightBookingInformation implements IFlightBookingInformation {
  bookingInfo: Partial<ISearchBookingFormValue>;
  flightDepart?: {
    ticket: FlightTicket;
    others: FlightTicket[];
  };
  flightReturn?: {
    ticket: FlightTicket;
    others: FlightTicket[];
  };
  passengers: PassengerInformationBookingType[];

  constructor(
    bookingInfo: Partial<ISearchBookingFormValue>,
    flightDepart:
      | {
          ticket: FlightTicket;
          others: FlightTicket[];
        }
      | undefined,
    flightReturn:
      | {
          ticket: FlightTicket;
          others: FlightTicket[];
        }
      | undefined,
    passengers: []
  ) {
    this.bookingInfo = bookingInfo;
    this.flightDepart = flightDepart;
    this.flightReturn = flightReturn;
    this.passengers = passengers;
  }
}
