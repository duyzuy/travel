"use client";
import React, { memo } from "react";
import classNames from "classnames";
import { DEPARTURE_TIMES } from "@/cache/vars";
const FilterTimeItem: React.FC<{
  name: string;
  timeStr: string;
  isActive: boolean;
  icon: React.ElementType;
  onClick: (code: DEPARTURE_TIMES) => void;
  code: string;
}> = ({ name, timeStr, isActive, icon, onClick, code }) => {
  const Icon = icon;
  return (
    <>
      <li className="w-1/2 p-1">
        <span
          className={classNames({
            "inner block rounded-md p-2 cursor-pointer": true,
            "bg-slate-50": !isActive,
            "bg-emerald-500 text-white": isActive,
          })}
          onClick={() => onClick(code as DEPARTURE_TIMES)}
        >
          <span className="text-sm flex items-center mb-1">
            {Icon && (
              <Icon
                className={classNames({
                  "mr-1": true,
                  "stroke-white": isActive,
                })}
              />
            )}
            {name}
          </span>
          <span>{timeStr}</span>
        </span>
      </li>
    </>
  );
};
export default memo(FilterTimeItem);
