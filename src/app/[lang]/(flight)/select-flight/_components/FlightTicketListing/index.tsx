"use client";

import React, { memo } from "react";

import { FlightDetailItemType, FlightOptionsType } from "@/Models/ticket";

import FlightTicketItems from "./FlightTicketItems";
import { Direction } from "@/constants/enum";

interface IFlightTicket {
  direction: Direction;
  onSelectFlight: (
    direction: Direction,
    { tid, outbound }: { tid: string; outbound: FlightDetailItemType }
  ) => void;
  flightOptions: FlightOptionsType;
}
const FlightTicketListing: React.FC<IFlightTicket> = ({
  direction,
  onSelectFlight,
  flightOptions,
}) => {
  const selectFlightCallback = ({
    tid,
    outbound,
  }: {
    tid: string;
    outbound: FlightDetailItemType;
  }) => {
    onSelectFlight(direction, { tid, outbound });
  };

  return (
    <FlightTicketItems
      flightTickets={flightOptions[direction].tickets}
      airlines={flightOptions.airlines}
      onSelectFlight={selectFlightCallback}
    />
  );
};
export default memo(FlightTicketListing);
