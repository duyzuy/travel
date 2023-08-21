"use client";
import React, { memo } from "react";

import { DEPARTURE_TIMES, FILTER_KEYS, DepartTimes } from "@/cache/vars";

import FilterItem from "@/components/Flights/FilterItem";

interface Props {
  labelText: string;
  filters: DepartTimes;
  onFilter: ({
    key,
    value,
  }: {
    key: FILTER_KEYS.DEPARTIME;
    value: DEPARTURE_TIMES;
  }) => void;
  listItems: {
    name: string;
    nameCode: DEPARTURE_TIMES;
    timeStr: string;
    icon: React.ElementType;
  }[];
}
const FilterTicketByTimes: React.FC<Props> = ({
  labelText,
  filters,
  onFilter,
  listItems,
}) => {
  return (
    <div className="box-filter pb-4">
      <div className="inner">
        <div className="box-filter-head pt-6 pb-2">
          <p className="font-bold">{labelText}</p>
        </div>
        <div className="box-filter-body">
          <ul className="order-list flex items-center flex-wrap -mx-1">
            {listItems.map((item) => (
              <FilterItem
                key={item.nameCode}
                name={item.name}
                icon={item.icon}
                timeStr={item.timeStr}
                isActive={filters.includes(item.nameCode as DEPARTURE_TIMES)}
                code={item.nameCode}
                onClick={(code) =>
                  onFilter({ key: FILTER_KEYS.DEPARTIME, value: code })
                }
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default memo(FilterTicketByTimes);
