"use client";

import { TripType } from "@/constants/enum";
import React, { memo } from "react";
import FlightSectorItem from "@/components/Flights/FlightSectorItem";

import { SECTOR_STATUS } from "@/components/Flights/FlightSectorItem";
const FlightSectors: React.FC<{ tripType?: TripType }> = ({
  tripType = TripType.ROUND_TRIP,
}) => {
  return (
    <>
      <FlightSectorItem
        labelText="Chuyến đi"
        depart="Tp. Ho Chi Minh (SGN)"
        arrival="Ha Noi (HAN)"
        departDate="T3, 15 tháng 8"
        sector="outbound"
        status={SECTOR_STATUS.IN_PROCESS}
      />
      <FlightSectorItem
        labelText="Chuyến về"
        depart="Ha Noi (HAN)"
        arrival="Tp. Ho Chi Minh (SGN)"
        departDate="T3, 15 tháng 8"
        sector="inbound"
        status={SECTOR_STATUS.WAITING}
      />
    </>
  );
};
export default memo(FlightSectors);
