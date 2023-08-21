"use client";
import React, { memo } from "react";
import FlightType from "../FlightType";
import { FlightDetailItemType } from "@/Models/ticket";
const FlightItemDuration: React.FC<{ data: FlightDetailItemType }> = ({
  data,
}) => {
  return (
    <div className="left flex items-center px-6 flex-1 justify-center">
      <span className="trip-from-info">
        <span className="time block text-xl">{data.departureTimeStr}</span>
        <span className="code block text-gray-500 text-sm">
          {data.departureAirport}
        </span>
      </span>
      <FlightType
        numStops={data.ticketdetail.numStops}
        durationTime={data.duration}
        transitTickets={data.transitTickets}
      />
      <span className="trip-from-info text-right">
        <span className="time block  text-xl">{data.arrivalTimeStr}</span>
        <span className="code block text-gray-500 text-sm">
          {data.arrivalAirport}
        </span>
      </span>
    </div>
  );
};
export default memo(FlightItemDuration);
