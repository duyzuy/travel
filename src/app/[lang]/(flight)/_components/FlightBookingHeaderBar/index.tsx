"use client";

import React, { memo, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import FlightSearchForm from "@/app/[lang]/_components/FlightSearchForm";
import { bookingInformationVar } from "@/cache/vars";
import { TripType } from "@/constants/enum";
import format from "date-fns/format";
import { FORMAT_DATE_SHORT } from "@/constants/config";
import { vi } from "date-fns/locale";
import SearchFlightInformation from "@/components/SearchFlightInformation";
import BookingSummaryHead from "@/components/BookingSummaryHead";
const FlightBookingHeaderBar = () => {
  const { bookingInfo } = useReactiveVar(bookingInformationVar);

  const [isShowBooking, setIsShowBooking] = useState(false);

  return (
    <div className="summary-header-bar bg-white border-t drop-shadow-md relative z-20">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <SearchFlightInformation
            tripType={
              bookingInfo.tripType ? bookingInfo.tripType : TripType.ROUND_TRIP
            }
            departDate={
              bookingInfo.departDate
                ? format(bookingInfo.departDate.date, FORMAT_DATE_SHORT, {
                    locale: vi,
                  })
                : ""
            }
            departureCityName={
              bookingInfo.tripFrom?.province.provinceName || ""
            }
            departureCode={bookingInfo.tripFrom?.code || ""}
            arrivalCityName={bookingInfo.tripTo?.province.provinceName || ""}
            arrivalCode={bookingInfo.tripTo?.code || ""}
            returnDate={
              bookingInfo.returnDate
                ? format(bookingInfo.returnDate.date, FORMAT_DATE_SHORT, {
                    locale: vi,
                  })
                : ""
            }
            adultAmount={bookingInfo.passengers?.adult.amount || 0}
            childrentAmount={bookingInfo.passengers?.children.amount || 0}
            infantAmount={bookingInfo.passengers?.infant.amount || 0}
            onEditSearch={() => setIsShowBooking((prev) => !prev)}
            isEditting={isShowBooking}
          />
          <BookingSummaryHead isShow={!isShowBooking} totalPrice={0} />
        </div>
        {isShowBooking ? (
          <div className="select-flight-form bg-white pb-6 -mx-4 rounded-sm">
            <FlightSearchForm showRecent={false} />
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default memo(FlightBookingHeaderBar);
