"use client";

import React, { memo } from "react";
import FlightShortingItems from "@/components/Flights/FlightShortingItems";
import { useFilterFlightTicket } from "@/modules/bookingTicket/useFilterFlightTicket";
import { flightsFilterVar } from "@/cache/vars";
import { SORTS_ENUM } from "@/cache/vars";
const FlightSortingTicket: React.FC = () => {
  const {
    onSortFlightTicket,
    filter: { sorting },
  } = useFilterFlightTicket(flightsFilterVar);

  const FILTERS = [
    { id: "early", name: "Cất cánh sớm nhất", code: SORTS_ENUM.EARLY },
    { id: "lowest", name: "Giá thấp nhất", code: SORTS_ENUM.LOWEST },
    { id: "fastest", name: "Bay nhanh nhất", code: SORTS_ENUM.FASTEST },
  ];

  return (
    <FlightShortingItems
      labelText="Sắp xếp theo"
      itemsList={FILTERS}
      sortValue={sorting}
      onSorting={onSortFlightTicket}
    />
  );
};
export default memo(FlightSortingTicket);
