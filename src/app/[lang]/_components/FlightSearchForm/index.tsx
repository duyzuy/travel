"use client";
import React, { memo, useState } from "react";

import { useApolloClient } from "@apollo/client";
import { AIRPORT_LIST } from "./airportList";

import DestinationSelect from "@/app/[lang]/_components/FlightSearchForm/DestinationSelect";
import PassengerFlightSelect from "./PassengerFlightSelect";
import DateRangeSelect from "./DateRangeSelect";

import vi from "date-fns/locale/vi";
import Button from "@/components/base/Button";
import { WTIRE_AIRPORT_LIST } from "@/cache/wtire";
import { useRouter, usePathname } from "next/navigation";

import { getLangeCode } from "@/utils/helper";
import { TripType } from "@/constants/enum";
import { flightSearchFormVar, bookingInformationVar } from "@/cache/vars";

import { useFlightBookingInformation } from "@/modules/bookingTicket/useFlightBookingInformation";
import { useSearchFormFlight } from "@/modules/bookingTicket/useSearchFlight";
import Checkbox from "@/components/base/Checkbox";
import FlightSearchRecent from "@/components/Flights/FlightSearchRecent";
const BookingFlightSearchForm: React.FC<{ showRecent?: boolean }> = ({
  showRecent = true,
}) => {
  const client = useApolloClient();

  client.writeQuery({
    query: WTIRE_AIRPORT_LIST,
    data: {
      airportList: [...AIRPORT_LIST],
    },
  });
  const router = useRouter();
  const pathName = usePathname();
  const langCode = getLangeCode(pathName);

  const {
    searchInfo,
    onChangeTripType,
    onSwapDestination,
    onSelectPassenger,
    onSelectTripDate,
    onSelectTripDestination,
  } = useSearchFormFlight(flightSearchFormVar);
  const ITEMS_RECENT = [
    {
      id: "SGN-HAN",
      depart: { code: "SGN", cityName: "Tp. Hồ Chí Minh" },
      arrival: { code: "HAN", cityName: "Hà Nội" },
      dateStr: "17 thg 08",
    },
    {
      id: "SIN-HAN",
      depart: { code: "SIN", cityName: "Singapore" },
      arrival: { code: "HAN", cityName: "Hà Nội" },
      dateStr: "17 thg 10",
    },
  ];
  const { onSubmitFlightSearchForm } = useFlightBookingInformation(
    bookingInformationVar
  );
  const [error, setError] = useState<{
    tripFrom?: string;
    tripTo?: string;
    departDate?: string;
    returnDate?: string;
  }>({});

  const handleSubmitFlightBookingForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchInfo === null) {
      setError((prev) => ({
        ...prev,
        tripFrom: "Vui lòng nhập tên thành phố",
      }));
      return;
    }
    if (searchInfo.tripTo === null) {
      return;
    }
    if (!searchInfo.departDate) {
      return;
    }
    if (searchInfo.tripType === TripType.ROUND_TRIP) {
      if (!searchInfo.returnDate) {
        return;
      }
    }

    onSubmitFlightSearchForm({
      ...searchInfo,
    });
    if (
      !pathName.includes("seats") &&
      !pathName.includes("passenger") &&
      !pathName.includes("select-flight")
    ) {
      router.push(`/${langCode}/select-flight`);
    }
  };

  return (
    <div className="bg-white relative z-20">
      <form onSubmit={handleSubmitFlightBookingForm} method="POST">
        <div className="space-y-5 flex-wrap">
          <div className="booking-trip-type flex relative items-center">
            <div className="booking-trip-type flex gap-x-3 items-center pl-3 pr-3">
              <Checkbox
                label="Khứ hồi"
                type="radio"
                className="cursor-pointer"
                name="roundTrip"
                isChecked={searchInfo.tripType === TripType.ROUND_TRIP}
                onChange={() => onChangeTripType(TripType.ROUND_TRIP)}
              />
              <Checkbox
                label="Một chiều"
                type="radio"
                className=" cursor-pointer"
                name="oneWay"
                isChecked={searchInfo.tripType === TripType.ONEWAY}
                onChange={() => onChangeTripType(TripType.ONEWAY)}
              />
            </div>
            <span className="line border-l border-gray-300 inline-block h-6 ml-2"></span>
            <div className="booking-passenger px-3">
              <PassengerFlightSelect
                variant="text"
                passengers={searchInfo.passengers}
                onSelectPassenger={onSelectPassenger}
              />
            </div>
          </div>
          <div className="booking-input-control flex flex-1 flex-wrap">
            <div className="booking-destination-inputs w-full md:w-6/12 px-3">
              <DestinationSelect
                onSelectAirport={onSelectTripDestination}
                onSwapDestination={onSwapDestination}
                tripFrom={searchInfo.tripFrom}
                tripTo={searchInfo.tripTo}
              />
            </div>
            <div className="booking-destination-dates flex flex-wrap w-full md:w-4/12 px-3">
              <DateRangeSelect
                locale={vi}
                onSelectDateRange={onSelectTripDate}
                returnDate={searchInfo.returnDate}
                departDate={searchInfo.departDate}
                tripType={searchInfo.tripType}
              />
            </div>
            <div className="booking-passengers w-full px-3 hidden">
              <PassengerFlightSelect
                passengers={searchInfo.passengers}
                onSelectPassenger={onSelectPassenger}
              />
            </div>
            <div className="booking-submit w-full md:w-2/12 px-3">
              <Button
                fullWidth
                size="lg"
                color="secondary"
                rounded="sm"
                type="submit"
              >
                Tìm chuyến bay
              </Button>
            </div>
          </div>
        </div>
      </form>

      <FlightSearchRecent
        recentItems={ITEMS_RECENT}
        labelText="Tìm kiếm gần đây"
        isOpen={showRecent}
        className="px-4 pt-6"
      />
    </div>
  );
};
export default memo(BookingFlightSearchForm);
