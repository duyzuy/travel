import { IFlightBookingInfo } from "@/Models";

import { ReactiveVar, useReactiveVar } from "@apollo/client";
import { Direction, TripType } from "@/constants/enum";
import { FlightDetailItemType } from "@/Models/ticket";
import { useQuery } from "@apollo/client";
import { FlightOptionsType } from "@/Models/ticket";
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
    direction: Direction,
    { tid, outbound }: { tid: string; outbound: FlightDetailItemType }
  ) => {
    let newData = { ...flightBookingInfo };

    if (direction === Direction.OUT_BOUND) {
      newData = {
        ...newData,
        flightDepart: { tid, outbound },
      };
    }

    if (
      direction === Direction.IN_BOUND &&
      flightBookingInfo.bookingInfo.tripType === TripType.ROUND_TRIP
    ) {
      newData = {
        ...newData,
        flightReturn: { tid, outbound },
      };
    }
    bookingInformationVar(newData);
  };

  const doSearchFlight = () => {
    const { data, loading } = useQuery<{
      flightOptions: FlightOptionsType;
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
