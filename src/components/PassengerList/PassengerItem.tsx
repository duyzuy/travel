"use client";

import React, { memo } from "react";
import classNames from "classnames";
const PassengerItem: React.FC<{
  data: { firstName: string; lastName: string; seat: string };
  isSelecting: boolean;
}> = ({ data, isSelecting }) => {
  return (
    <li
      className={classNames({
        "pax-item flex items-center px-4 py-2 h-16 border rounded-sm mr-3 bg-white md:1/3 lg:w-80 cursor-pointer":
          true,
        "border-emerald-500 active": isSelecting,
        "shadow-sm": !isSelecting,
      })}
    >
      <span className="w-8 h-8 bg-emerald-500 text-white flex items-center justify-center rounded-full mr-2 text-xs font-extrabold">
        NT
      </span>
      <p className="block flex-1" style={{ width: "calc(100% - 2.5rem)" }}>
        <span className="block font-bold">
          {data.firstName}, {data.lastName}
        </span>
        <span
          className={classNames({
            block: true,
            "text-gray-500 text-xs": data.seat === "",
          })}
        >
          {(data.seat !== "" && `Ghế: ${data.seat}`) || "Chưa chọn ghế"}
        </span>
      </p>
    </li>
  );
};
export default memo(PassengerItem);
