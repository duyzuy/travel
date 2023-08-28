import { ISearchBookingFormValue } from "./searchBookingForm.interface";
import { FlightTicket } from "@/Models/flight/ticket";
import { IPassengerInformationFormValue } from "../passengerInformation/passengerInformation.interface";
import { IBookingServices } from "../bookingServices/bookingServices.interface";
export type PassengerBookingInformationType =
  IPassengerInformationFormValue["passengers"][0] & { index: number };

export type ContactBookingInformationType = Omit<
  IPassengerInformationFormValue,
  "passengers"
>;
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
  passengerInformation: ContactBookingInformationType & {
    passengers: PassengerBookingInformationType[];
  };
  services: IBookingServices;
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
  passengerInformation: ContactBookingInformationType & {
    passengers: PassengerBookingInformationType[];
  };
  services: IBookingServices;

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
    passengerInformation: ContactBookingInformationType & {
      passengers: PassengerBookingInformationType[];
    },
    services: IBookingServices
  ) {
    this.bookingInfo = bookingInfo;
    this.flightDepart = flightDepart;
    this.flightReturn = flightReturn;
    this.passengerInformation = passengerInformation;
    this.services = services;
  }
}
