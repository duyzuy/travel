"use client";
import React, { memo, useCallback } from "react";
import {
  IconEarlyMorning,
  IconAfternoon,
  IconMorning,
  IconNight,
} from "../Icons";
import FilterTimeItem from "./FilterTimeItem";
import { useReactiveVar } from "@apollo/client";
import { DEPARTURE_TIMES, flightsFilterVar, FILTER_KEYS } from "@/cache/vars";

import { useFlightFilter } from "@/hooks/useFlightFilter";

const FilterTimes: React.FC = () => {
  const { departTimes } = useReactiveVar(flightsFilterVar);

  const onFilter = useFlightFilter(flightsFilterVar);
  const FILTER_TIMES = [
    {
      name: "Sáng sớm",
      nameCode: DEPARTURE_TIMES.EARLY_MORNING,
      timeStr: "00:00 - 06:00",
      icon: IconEarlyMorning,
    },
    {
      name: "Buổi sáng",
      nameCode: DEPARTURE_TIMES.MORNING,
      timeStr: "06:00 - 12:00",
      icon: IconMorning,
    },
    {
      name: "Buổi chiều",
      nameCode: DEPARTURE_TIMES.AFTERNOON,
      timeStr: "12:00 - 18:00",
      icon: IconAfternoon,
    },
    {
      name: "Buổi tối",
      nameCode: DEPARTURE_TIMES.NIGHT,
      timeStr: "18:00 - 24:00",
      icon: IconNight,
    },
  ];

  const handleFinterTimes = useCallback((code: DEPARTURE_TIMES) => {
    onFilter({ key: FILTER_KEYS.DEPARTIME, value: code });
  }, []);
  return (
    <ul className="order-list flex items-center flex-wrap -mx-1">
      {FILTER_TIMES.map((item) => (
        <FilterTimeItem
          key={item.nameCode}
          name={item.name}
          icon={item.icon}
          timeStr={item.timeStr}
          isActive={departTimes.includes(item.nameCode as DEPARTURE_TIMES)}
          code={item.nameCode}
          onClick={handleFinterTimes}
        />
      ))}
    </ul>
  );
};
export default memo(FilterTimes);
