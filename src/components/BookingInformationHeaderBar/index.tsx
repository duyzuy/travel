"use client";

import React, { memo, useState } from "react";
import Button from "../Button";
import BookingFlightSearchForm from "@/app/[lang]/components/BookingFlightSearchForm";
import { useReactiveVar } from "@apollo/client";
import { bookingInformationVar } from "@/cache/vars";
import { IconRoundTrip, IconOneWay } from "../Icons";
import { TripType } from "@/constants/enum";
import BookingSummary from "./BookingSummary";
import format from "date-fns/format";
import { FORMAT_DATE_SHORT } from "@/constants/config";
import { vi } from "date-fns/locale";
const BookingInformationHeaderBar = () => {
  const { bookingInfor } = useReactiveVar(bookingInformationVar);

  const { tripFrom, tripTo, tripType, departDate, returnDate, passengers } =
    bookingInfor;
  const [isShowBooking, setIsShowBooking] = useState(false);
  return (
    <div className="summary-header-bar bg-white border-t drop-shadow-md relative z-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="summary-booking-infor flex items-center flex-1">
            <div className="mr-12">
              <p className="round-trip flex items-center">
                <span className="depart-name font-bold">
                  <span className="city mr-1 uppercase">
                    {tripFrom?.province.provinceName}
                  </span>
                  <span className="code text-sm text-gray-500">
                    ({tripFrom?.code})
                  </span>
                </span>

                <span className="trip-type mx-2">
                  {(tripType === TripType.ROUND_TRIP && <IconRoundTrip />) || (
                    <IconOneWay />
                  )}
                </span>
                <span className="arrival-name font-bold">
                  <span className="city mr-1 uppercase">
                    {tripTo?.province.provinceName}
                  </span>
                  <span className="code text-sm text-gray-500">
                    ({tripTo?.code})
                  </span>
                </span>
              </p>
              <p className="trip-info text-sm text-gray-500">
                <span>
                  {(tripType === TripType.ROUND_TRIP && "Khứ hồi") ||
                    "Một chiều"}
                </span>
                <span className="mx-2 text-xs">|</span>
                <span className="">
                  <span className="depart-date">
                    {departDate.date &&
                      format(departDate.date, FORMAT_DATE_SHORT, {
                        locale: vi,
                      })}
                    {(tripType === TripType.ROUND_TRIP && (
                      <>
                        <span className="mx-1">-</span>
                        <span className="return-date">
                          {returnDate.date &&
                            format(returnDate.date, FORMAT_DATE_SHORT, {
                              locale: vi,
                            })}
                        </span>
                      </>
                    )) || <></>}
                  </span>
                </span>
                <span className="mx-2 text-xs">|</span>
                <span className="passengers">
                  <span className="pax-adult">
                    {passengers.adult.amount} người lớn
                  </span>
                  {(passengers.children.amount > 0 && (
                    <span className="pax-children">{`, ${passengers.children.amount} trẻ em`}</span>
                  )) || <></>}
                  {(passengers.infant.amount > 0 && (
                    <span className="pax-children">{`, ${passengers.infant.amount} em bé`}</span>
                  )) || <></>}
                </span>
              </p>
            </div>
            <div className="">
              <Button
                color={(isShowBooking && "danger") || "secondary"}
                variant="outline"
                size="sm"
                rounded="sm"
                className="text-xs shadow-md"
                onClick={() => setIsShowBooking((prev) => !prev)}
              >
                {(isShowBooking && "Huỷ bỏ") || "Chỉnh sửa"}
              </Button>
            </div>
          </div>
          <BookingSummary isShow={!isShowBooking} />
        </div>
        {(isShowBooking && (
          <div className="select-flight-form bg-white pb-6 -mx-4 rounded-sm">
            <BookingFlightSearchForm showRecent={false} />
          </div>
        )) || <></>}
      </div>
    </div>
  );
};
export default memo(BookingInformationHeaderBar);
