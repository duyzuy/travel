"use client";
import React, { memo } from "react";

import { useApolloClient } from "@apollo/client";
import { AIRPORT_LIST } from "@/components/BookingMultipleForm/airportList";
import SelectTripType from "@/components/BookingMultipleForm/partials/SelectTripType";
import InputPassenger from "@/components/BookingMultipleForm/partials/InputPassenger";
import InputRouting from "@/components/BookingMultipleForm/partials/InputRouting";
import InputDateRange from "@/components/BookingMultipleForm/partials/InputDateRange";
import SearchRecent from "./SearchRecent";
import vi from "date-fns/locale/vi";
import Button from "@/components/Button";
import { WTIRE_AIRPORT_LIST } from "@/cache/wtire";
import styles from "./search-flight.module.scss";
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

  return (
    <div className={styles.wrapper}>
      <form>
        <div className="space-y-5 flex-wrap">
          <div className="booking-trip-type flex relative items-center">
            <div className="booking-trip-type flex gap-x-3 items-center pl-3 pr-3">
              <SelectTripType />
            </div>
            <span className="line border-l border-gray-300 inline-block h-6 ml-2"></span>
            <div className="booking-passenger px-3">
              <InputPassenger variant="text" />
            </div>
          </div>
          <div className="booking-input-control flex flex-1 flex-wrap">
            <div className="booking-destination-inputs w-full md:w-6/12 px-3">
              <InputRouting />
            </div>
            <div className="booking-destination-dates flex flex-wrap w-full md:w-4/12 px-3">
              <InputDateRange locale={vi} />
            </div>
            <div className="booking-passengers w-full px-3 hidden">
              <InputPassenger />
            </div>
            <div className="booking-submit w-full md:w-2/12 px-3">
              <Button fullWidth size="lg" color="secondary" rounded="sm">
                Tìm chuyến bay
              </Button>
            </div>
          </div>
        </div>
      </form>
      {showRecent && (
        <div className="recent px-3">
          <SearchRecent />
        </div>
      )}
    </div>
  );
};
export default memo(BookingFlightSearchForm);
