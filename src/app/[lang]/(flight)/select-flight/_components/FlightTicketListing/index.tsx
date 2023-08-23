"use client";

import React, { memo } from "react";

import { FlightTicket } from "@/Models/flight/ticket";

import FlightTicketItems from "./FlightTicketItems";
import { DIRECTION } from "@/constants/enum";
import { FlightOptions } from "@/Models/flight/flightOptions";

interface IFlightTicket {
  direction: DIRECTION;
  onSelectFlight: (
    direction: DIRECTION,
    {
      ticket,
      otherTickets,
    }: { ticket: FlightTicket; otherTickets: FlightTicket[] }
  ) => void;
  flightOptions: FlightOptions;
}
const FlightTicketListing: React.FC<IFlightTicket> = ({
  direction,
  onSelectFlight,
  flightOptions,
}) => {
  return (
    <FlightTicketItems
      flightTickets={flightOptions[direction].tickets}
      airlines={flightOptions.airlines}
      onSelectFlight={(data) =>
        onSelectFlight(direction, {
          ticket: data.ticket,
          otherTickets: data.otherTickets,
        })
      }
    />
  );
};
export default memo(FlightTicketListing);
