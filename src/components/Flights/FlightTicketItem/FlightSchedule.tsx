"use client";
import React, { memo } from "react";
import FlightType from "./FlightType";
import { FlightTicket } from "@/Models/flight/ticket";
type FlightScheduleType = Pick<
  FlightTicket["outbound"],
  | "departureTimeStr"
  | "arrivalTimeStr"
  | "departureAirport"
  | "arrivalAirport"
  | "transitTickets"
> & {
  durationStr: string;
};
const FlightSchedule: React.FC<FlightScheduleType> = ({
  departureTimeStr,
  arrivalTimeStr,
  departureAirport,
  arrivalAirport,
  transitTickets,
  durationStr,
}) => {
  return (
    <div className="left flex items-center px-6 flex-1 justify-center">
      <span className="trip-from-info">
        <span className="time block text-xl">{departureTimeStr}</span>
        <span className="code block text-gray-500 text-sm">
          {departureAirport}
        </span>
      </span>
      <FlightType durationStr={durationStr} transitTickets={transitTickets} />
      <span className="trip-from-info text-right">
        <span className="time block  text-xl">{arrivalTimeStr}</span>
        <span className="code block text-gray-500 text-sm">
          {arrivalAirport}
        </span>
      </span>
    </div>
  );
};
export default memo(FlightSchedule);
