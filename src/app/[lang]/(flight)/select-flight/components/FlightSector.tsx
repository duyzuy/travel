"use client";

import { TripType } from "@/Models/booking";
import React, { memo } from "react";

const FlightSector: React.FC<{ tripType?: TripType }> = ({
  tripType = TripType.ROUND_TRIP,
}) => {
  return (
    <>
      <div className="flight-trip relatvie trip-from px-6 py-4 w-full md:w-1/2 selecting border bg-white rounded-md shadow-sm border-emerald-500 relative">
        <span className="inline-block text-emerald-600">Chuyến bay</span>
        <div className="flight-trip flex items-center">
          <span className="text-lg">TP Hồ Chí Minh (SGN)</span>
          <span className="icon mx-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </span>
          <span className="text-lg">Hà Nội (HAN)</span>
        </div>
        <p className="trip-date flex text-sm text-gray-600">
          <span>
            <time dateTime="T3, 15 tháng 8">T3, 15 tháng 8</time>
          </span>
          <span className="mx-2">|</span>
          <span>1 người lớn, 1 trẻ em</span>
        </p>

        <span className="status inline-block px-3 py-1 bg-emerald-500 text-xs rounded-full text-white absolute right-3 bottom-3">
          Đang chọn
        </span>
      </div>
      <div className="flight-trip trip-from w-full md:w-1/2 border bg-white rounded-md shadow-sm px-6 py-4 opacity-60 relative">
        <span className="inline-block text-orange-600">Chuyến bay</span>
        <div className="flight-trip flex items-center">
          <span className="text-lg">Hà Nội (HAN)</span>
          <span className="icon mx-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </span>
          <span className="text-lg">TP Hồ Chí Minh (SGN)</span>
        </div>
        <p className="trip-date flex text-sm text-gray-600">
          <span>
            <time dateTime="T3, 15 tháng 8">T3, 15 tháng 8</time>
          </span>
          <span className="mx-2">|</span>
          <span>1 người lớn, 1 trẻ em</span>
        </p>
        <span className="status inline-block px-3 py-1 bg-sky-500 text-xs rounded-full text-white absolute right-3 bottom-3">
          Đang chọn
        </span>
      </div>
    </>
  );
};
export default memo(FlightSector);
