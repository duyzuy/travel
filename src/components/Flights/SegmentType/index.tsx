"use client";
import React, { memo } from "react";
interface ISegmentType {
  departureAirport?: string;
  arrivalAirport?: string;
}
const SegmentType: React.FC<ISegmentType> = ({
  departureAirport,
  arrivalAirport,
}) => {
  return (
    <div className="flight-info flex items-center">
      <span>{departureAirport}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="16"
        height="16"
        fill="#11b981"
        className="mx-3"
      >
        <path d="m186.62 464h-26.62a16 16 0 0 1 -14.57-22.6l64.46-142.25-96.79-2.15-35.3 42.77c-6.73 8.46-12.1 12.23-25.8 12.23h-17.92a17.66 17.66 0 0 1 -14.7-7.06c-2.38-3.21-4.72-8.65-2.44-16.41l19.82-71c.15-.53.33-1.06.53-1.58a.38.38 0 0 0 0-.15 14.82 14.82 0 0 1 -.53-1.59l-19.84-71.45c-2.15-7.61.2-12.93 2.56-16.06a16.83 16.83 0 0 1 13.6-6.7h18.92c10.23 0 20.16 4.59 26 12l34.57 42.05 97.32-1.44-64.44-142a16 16 0 0 1 14.55-22.61h26.91a25 25 0 0 1 19.35 9.8l125.05 152 57.77-1.52c4.23-.23 15.95-.31 18.66-.31 55.26.03 88.26 17.97 88.26 48.03 0 9.46-3.78 27-29.07 38.16-14.93 6.6-34.85 9.94-59.21 9.94-2.68 0-14.37-.08-18.66-.31l-57.76-1.54-125.36 152a25 25 0 0 1 -19.32 9.75z" />
      </svg>
      <span>{arrivalAirport}</span>
    </div>
  );
};
export default memo(SegmentType);
