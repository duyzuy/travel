"use client";
import React, { memo } from "react";
import classNames from "classnames";
import { SORTINGS } from "@/cache/vars";
const FlightSortingItem: React.FC<{
  name: string;
  isActive: boolean;
  onClick: (sort: SORTINGS) => void;
  code: SORTINGS;
}> = ({ name, isActive, onClick, code }) => {
  return (
    <li
      className={classNames({
        "item px-3 py-1  rounded-md text-sm cursor-pointer": true,
        "bg-emerald-500 text-white": isActive,
        "hover:bg-slate-50 transition-colors": !isActive,
      })}
      onClick={() => {
        if (!isActive) {
          return onClick(code);
        }
      }}
    >
      <span>{name}</span>
    </li>
  );
};
export default memo(FlightSortingItem);
