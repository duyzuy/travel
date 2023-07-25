"use client";

import { FILTER_KEYS, SHORTINGS } from "@/cache/vars";
import React, { memo, useCallback } from "react";
import FlightSortingItem from "./FlightSortingItem";
import { useReactiveVar } from "@apollo/client";
import { flightsFilterVar } from "@/cache/vars";
import { useFlightFilter } from "@/hooks/useFlightFilter";
const FlightShortingItems: React.FC = () => {
  const FILTERS = [
    { id: "early", name: "Cất cánh sớm nhất", code: SHORTINGS.EARLY },
    { id: "lowest", name: "Giá thấp nhất", code: SHORTINGS.LOWEST },
    { id: "fastest", name: "Bay nhanh nhất", code: SHORTINGS.FASTEST },
  ];

  const filters = useReactiveVar(flightsFilterVar);

  const onShortting = useFlightFilter(flightsFilterVar);
  const handleSortting = useCallback((sort: SHORTINGS) => {
    onShortting({ key: FILTER_KEYS.SORTING, value: sort });
  }, []);

  return (
    <div className="flights-sorting shadow-sm rounded-sm bg-white px-3 py-2 mb-4">
      <div className="inner flex items-center">
        <div className="sorting-head flex items-center">
          <span className="icon p-2 mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
          </span>
          <span className="font-bold">Sắp xếp theo</span>
        </div>
        <div className="sorting-body pl-4 flex-1">
          <ul className="sort-list flex items-center justify-items-end justify-end flex-1 gap-x-3">
            {FILTERS.map((filterItem) => (
              <FlightSortingItem
                key={filterItem.id}
                name={filterItem.name}
                isActive={filters.sorting === filterItem.code}
                code={filterItem.code}
                onClick={handleSortting}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(FlightShortingItems);
