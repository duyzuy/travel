"use client";

import React, { memo } from "react";
import FlightItem from "../FlightItem";
import { useQuery } from "@apollo/client";
import { GET_FLIGHT_OPTIONS } from "@/operations/queries/flightOptions";
import { Airline } from "@/Models/airline";
import { FlightOptionsType } from "@/Models/ticket";
const FlightItems: React.FC = () => {
  const { data, loading, networkStatus } = useQuery<{
    flightOptions: FlightOptionsType;
  }>(GET_FLIGHT_OPTIONS);

  if (!data) {
    return <>...loading</>;
  }

  const { flightOptions } = data;
  return (
    <>
      <div className="flight-items">
        {flightOptions.outbound.tickets.map((ticket) => (
          <FlightItem flightItemData={ticket.outbound} key={ticket.tid} />
        ))}
      </div>
    </>
  );
};
export default memo(FlightItems);
