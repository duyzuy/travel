import { IAirPort } from "@/Models/airport";
import { IFlightBookingInfo } from "@/Models";

import { ReactiveVar } from "@apollo/client";
export const useFlightBookingInformation = (
  bookingInformationVar: ReactiveVar<IFlightBookingInfo>
) => {
  const flightBookingInfo = bookingInformationVar();

  const onSubmitFlightSearchForm = (
    searchData: IFlightBookingInfo["bookingInfo"]
  ) => {
    bookingInformationVar({
      ...flightBookingInfo,
      bookingInfo: { ...searchData },
    });
  };
  return {
    onSubmitFlightSearchForm,
  };
};
