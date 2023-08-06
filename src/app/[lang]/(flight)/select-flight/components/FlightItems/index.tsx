"use client";

import React, { memo } from "react";
import { useQuery } from "@apollo/client";
import { GET_FLIGHT_OPTIONS } from "@/operations/queries/flightOptions";
import { FlightOptionsType } from "@/Models/ticket";

import BookingFlightItems from "./BookingFlightItems";
import { Direction } from "@/constants/enum";

const FlightItems: React.FC = () => {
  const { data, loading } = useQuery<{
    flightOptions: FlightOptionsType;
  }>(GET_FLIGHT_OPTIONS, {});

  if (loading) {
    return <>...loading</>;
  }

  if (!data) {
    return <>no data</>;
  }
  const { flightOptions } = data;

  return (
    <BookingFlightItems
      flightItems={flightOptions.outbound.tickets}
      airlines={flightOptions.airlines}
      direction={Direction.OUT_BOUND}
    />
  );
};
export default memo(FlightItems);
