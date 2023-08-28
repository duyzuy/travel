import { IFlightBookingInformation } from "./bookingInformation.interface";

import { ReactiveVar, useReactiveVar } from "@apollo/client";
import { DIRECTION, TRIP_TYPE } from "@/constants/enum";
import { FlightTicket } from "@/Models/flight/ticket";

import {
  FLIGHT_SERVICES,
  IBookingServices,
} from "../bookingServices/bookingServices.interface";
export const useBookingFlightInfo = (
  bookingInformationVar: ReactiveVar<IFlightBookingInformation>
) => {
  const flightBookingInfo = bookingInformationVar();

  const onSubmitFlightSearchForm = (
    searchData: IFlightBookingInformation["bookingInfo"]
  ) => {
    bookingInformationVar({
      ...flightBookingInfo,
      bookingInfo: { ...searchData },
    });
  };

  const onSelectFlight = (
    direction: DIRECTION,
    {
      ticket,
      otherTickets,
    }: { ticket: FlightTicket; otherTickets: FlightTicket[] }
  ) => {
    let newData = { ...flightBookingInfo };

    if (direction === DIRECTION.OUT_BOUND) {
      newData = {
        ...newData,
        flightDepart: {
          ticket,
          others: otherTickets,
        },
      };
    }

    if (
      direction === DIRECTION.IN_BOUND &&
      flightBookingInfo.bookingInfo.tripType === TRIP_TYPE.ROUND_TRIP
    ) {
      newData = {
        ...newData,
        flightReturn: {
          ticket,
          others: otherTickets,
        },
      };
    }
    bookingInformationVar(newData);
  };

  const onAddBookingFlightService = (
    serviceName: FLIGHT_SERVICES,
    serviceItems: IBookingServices[FLIGHT_SERVICES]
  ) => {
    bookingInformationVar({
      ...flightBookingInfo,
      services: {
        ...flightBookingInfo.services,
        [serviceName]: serviceItems,
      },
    });
  };
  return {
    onSubmitFlightSearchForm,
    onSelectFlight,
    // doSearchFlight,
    onAddBookingFlightService,
    flightBookingInfo: useReactiveVar(bookingInformationVar),
  };
};
