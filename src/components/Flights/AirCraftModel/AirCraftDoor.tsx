"use client";

import React, { memo } from "react";
import classNames from "classnames";
const AirCraftDoor: React.FC<{
  className?: string;
  doorName?: string;
}> = ({ className = "", doorName = "Lối thoát hiểm" }) => {
  return (
    <div
      className={classNames({
        "exist-note text-gray-500 flex justify-between": true,
        [className]: className,
      })}
    >
      <div className="exist-left flex items-center">
        <span
          className="w-2 h-8 bg-gray-300 block"
          style={{ transform: "translateX(2px)" }}
        ></span>
        <span className="text-sm ml-2">{doorName}</span>
      </div>
      <div className="exist-right flex items-center">
        <span className="text-sm mr-2">{doorName}</span>
        <span
          className="w-2 h-8 bg-gray-300 block"
          style={{ transform: "translateX(-2px)" }}
        ></span>
      </div>
    </div>
  );
};
export default memo(AirCraftDoor);
