import { IBookingType, TripType } from "@/Models/booking";
import { ReactiveVar } from "@apollo/client";

export const useBookingInformation = (
  bookingInformationVar: ReactiveVar<IBookingType>
) => {
  const changeTripType = (tripType: TripType) => {
    const bookingInfor = bookingInformationVar();
    const newBookingChange = {
      ...bookingInfor,
      tripType,
    };

    bookingInformationVar(newBookingChange);
  };

  const onSelectDate = () => {};
  return {
    operations: {
      changeTripType,
    },
  };
};
