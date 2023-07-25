"use client";
import React, { memo } from "react";
import { VJBrandOneIcon, BBBrandIcon, VNABrandIcon } from "@/assets/icons";
import Image from "next/image";
const FlightSectorItem: React.FC<{
  depart: string;
  arrival: string;
  sector: "inbound" | "outbound";
  departDate: string;
  isCurrent?: boolean;
  isSelected?: boolean;
}> = ({
  depart,
  arrival,
  sector,
  departDate = "T3, 15 tháng 8",
  isCurrent = false,
  isSelected = false,
}) => {
  return (
    <>
      <div className="flight-trip relatvie trip-from px-6 py-4 w-full md:w-1/2 selecting border bg-white rounded-md shadow-sm border-emerald-500 relative">
        <span className="inline-block text-emerald-600">Chuyến bay</span>
        <div className="flight-trip flex items-center">
          <span className="text-lg">{depart}</span>
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
          <span className="text-lg">{arrival}</span>
        </div>
        <p className="trip-date flex text-sm text-gray-600">
          <span>
            <time dateTime={departDate}>{departDate}</time>
          </span>
          <span className="mx-2">|</span>
          <span>1 người lớn, 1 trẻ em</span>
        </p>
        <div className="sector-info">
          <div className="brand-name">
            <Image src={VJBrandOneIcon} alt="viet" width={40} />
            <span>Vietjet Air</span>
            <span>VJ196</span>
          </div>
          <div className="flightInfo"></div>
        </div>
        <span className="status inline-block px-3 py-1 bg-emerald-500 text-xs rounded-full text-white  right-3 bottom-3">
          Đang chọn
        </span>
      </div>
    </>
  );
};
export default memo(FlightSectorItem);
