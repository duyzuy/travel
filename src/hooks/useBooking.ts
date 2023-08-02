import { IAirPort } from "@/Models/airport";
import { BookingFormType, IBookingType } from "@/Models/booking";
import { ReactiveVar } from "@apollo/client";
import { PaxType, TripDate, TripDestination, TripType } from "@/constants/enum";
export const useBookingInformation = (
  bookingInformationVar: ReactiveVar<IBookingType>
) => {
  const onSubmitFlightSearchForm = (searchData: BookingFormType) => {
    let bookingData = bookingInformationVar();

    bookingData = {
      ...bookingData,
      bookingInfor: { ...searchData },
    };
    bookingInformationVar(bookingData);
  };
  return {
    onSubmitFlightSearchForm,
  };
};
