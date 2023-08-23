import { IFlightBookingInfo } from "@/Models";

import { ReactiveVar, useReactiveVar } from "@apollo/client";
import { DIRECTION, TRIP_TYPE } from "@/constants/enum";
import { FlightTicket } from "@/Models/flight/ticket";
import { useQuery } from "@apollo/client";
import { FlightOptions } from "@/Models/flight/flightOptions";
import { GET_FLIGHT_OPTIONS } from "@/operations/queries/flightOptions";
export const useBookingFlightInfo = (
  bookingInformationVar: ReactiveVar<IFlightBookingInfo>
) => {
  const flightBookingInfo = bookingInformationVar();
  const bookingInfo = useReactiveVar(bookingInformationVar);

  const onSubmitFlightSearchForm = (
    searchData: IFlightBookingInfo["bookingInfo"]
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

  const doSearchFlight = () => {
    const { data, loading } = useQuery<{
      flightOptions: FlightOptions;
    }>(GET_FLIGHT_OPTIONS);

    return { data, loading };
  };
  return {
    onSubmitFlightSearchForm,
    onSelectFlight,
    doSearchFlight,
    flightBookingInfo: bookingInfo,
  };
};
