"use client";
import React, { memo } from "react";
import IconAirCraftTL from "../Icons/IconAirCraftTL";
import AirCraftExistDoor from "../AirCraftExistDoor";
const AirCraftHead: React.FC<{
  height?: "h-40" | "h-80" | "h-60";
  borderColor?: "border-gray-300" | "border-gray-200" | "border-gray-50";
}> = ({ height = "h-80", borderColor = "border-gray-300" }) => {
  return (
    <div className={`aircraft-top relative ${height}`}>
      <div className="relative w-full h-full flex">
        <div
          className={`aircraft-top-left border-l-4 w-1/2 bg-white ${borderColor}`}
          style={{
            borderTopLeftRadius: "100%",
          }}
        ></div>
        <div
          className={`aircraft-top-right border-r-4 w-1/2 bg-white ${borderColor}`}
          style={{
            borderTopRightRadius: "100%",
          }}
        ></div>
      </div>
      <span className="absolute bottom-12 left-8 w-24 h-10 bg-gray-100 flex items-center justify-center rounded-md">
        <IconAirCraftTL width={24} height={24} fill="#9ca3af" />
      </span>
      <AirCraftExistDoor className="absolute bottom-0 -left-1 -right-1" />
    </div>
  );
};
export default memo(AirCraftHead);
