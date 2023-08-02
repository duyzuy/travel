"use client";

import Checkbox from "@/components/Checkbox";
import React, { memo } from "react";
import { useReactiveVar } from "@apollo/client";
import { bookingInformationVar } from "@/cache/vars";
import { TripType } from "@/constants/enum";
import { useBookingInformation } from "@/hooks/useBooking";
const SelectTripType: React.FC = () => {
  const { tripType } = useReactiveVar(bookingInformationVar);
  const {
    operations: { changeTripType },
  } = useBookingInformation(bookingInformationVar);

  return (
    <>
      <Checkbox
        label="Khứ hồi"
        type="radio"
        className="px-2 py-1 cursor-pointer"
        name="roundTrip"
        isChecked={tripType === TripType.ROUND_TRIP && true}
        onChange={() => changeTripType(TripType.ROUND_TRIP)}
      />
      <Checkbox
        label="Một chiều"
        type="radio"
        className="px-2 py-1 cursor-pointer"
        name="oneWay"
        isChecked={tripType === TripType.ONEWAY && true}
        onChange={() => changeTripType(TripType.ONEWAY)}
      />
    </>
  );
};
export default memo(SelectTripType);
