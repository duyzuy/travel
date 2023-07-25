"use client";

import { TripType } from "@/Models/booking";
import React, { memo } from "react";
import FlightSectorItem from "@/app/[lang]/components/FlightSectorItem";
const FlightSector: React.FC<{ tripType?: TripType }> = ({
  tripType = TripType.ROUND_TRIP,
}) => {
  return (
    <>
      <FlightSectorItem
        depart="Tp. Ho Chi Minh (SGN)"
        arrival="Ha Noi (HAN)"
        departDate="T3, 15 tháng 8"
        sector="outbound"
      />
      <FlightSectorItem
        depart="Ha Noi (HAN)"
        arrival="Tp. Ho Chi Minh (SGN)"
        departDate="T3, 15 tháng 8"
        sector="inbound"
      />
    </>
  );
};
export default memo(FlightSector);
