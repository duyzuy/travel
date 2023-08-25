"use client";
import React, { memo } from "react";

import FilterTicketByTimes from "./FilterTicketByTimes";
import FilterTicketByBrands from "./FilterTicketByBrands";
import { useFilterFlightTicket } from "@/modules/bookingTicket/useFilterFlightTicket";
import { flightsFilterVar } from "@/cache/vars";
import { VJBrandOneIcon, VNABrandIcon, BBBrandIcon } from "@/assets/icons";
import { DEPARTURE_TIMES } from "@/cache/vars";
import {
  IconEarlyMorning,
  IconAfternoon,
  IconMorning,
  IconNight,
} from "@/components/Icons";
import classNames from "classnames";
interface IFlightTicketFilter {
  className?: string;
}
const FlightTicketFilter: React.FC<IFlightTicketFilter> = ({
  className = "",
}) => {
  const {
    onFilterFlightTicket,
    filter: { brands, departTimes },
  } = useFilterFlightTicket(flightsFilterVar);
  const BRANDS_FILTER = [
    { name: "Vietjet", icon: VJBrandOneIcon, code: "VJ" },
    { name: "Vietnam Airline", icon: VNABrandIcon, code: "VN" },
    { name: "Bamboo Airway", icon: BBBrandIcon, code: "QH" },
  ];
  const FILTER_TIMES = [
    {
      name: "Sáng sớm",
      nameCode: DEPARTURE_TIMES.EARLY_MORNING,
      timeStr: "00:00 - 06:00",
      icon: IconEarlyMorning,
    },
    {
      name: "Buổi sáng",
      nameCode: DEPARTURE_TIMES.MORNING,
      timeStr: "06:00 - 12:00",
      icon: IconMorning,
    },
    {
      name: "Buổi chiều",
      nameCode: DEPARTURE_TIMES.AFTERNOON,
      timeStr: "12:00 - 18:00",
      icon: IconAfternoon,
    },
    {
      name: "Buổi tối",
      nameCode: DEPARTURE_TIMES.NIGHT,
      timeStr: "18:00 - 24:00",
      icon: IconNight,
    },
  ];
  return (
    <div
      className={classNames({
        "select-flight-left bg-white shadow-sm rounded-sm px-4 sticky top-0":
          true,
        [className]: className,
      })}
    >
      <div className="filter-head flex items-center justify-between border-b py-4">
        <p className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
          <span className="font-bold">Bộ lọc</span>
        </p>
        <button className="px-2 py-1 rounded-sm text-xs text-emerald-600 border border-emerald-500 hover:bg-emerald-500 hover:text-white">
          Đặt lại
        </button>
      </div>
      <div className="filter-body">
        <FilterTicketByBrands
          labelText="Hãng hàng không"
          itemList={BRANDS_FILTER}
          filters={brands}
          onFilter={(data) =>
            onFilterFlightTicket({
              key: data.key,
              value: data.value,
            })
          }
        />
        <FilterTicketByTimes
          labelText="Thời gian bay"
          filters={departTimes}
          listItems={FILTER_TIMES}
          onFilter={onFilterFlightTicket}
        />
      </div>
    </div>
  );
};
export default memo(FlightTicketFilter);
