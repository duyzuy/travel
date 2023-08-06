"use client";
import React, { memo } from "react";
import IconAirCraftTL from "../Icons/IconAirCraftTL";
import AirCraftExistDoor from "../AirCraftExistDoor";
const AirCraftBottom: React.FC<{
  height?: "h-40" | "h-80" | "h-60";
  borderColor?: "border-gray-300" | "border-gray-200" | "border-gray-100";
}> = ({ height = "h-80", borderColor = "border-gray-300" }) => {
  return (
    <div
      className={`aircraft-bottom border-l-4 border-r-4 border-b-4 relative bg-white border-gray-300 px-4`}
      style={{
        borderBottomLeftRadius: 150,
        borderBottomRightRadius: 150,
      }}
    >
      <div className="inner relative h-60">
        <div className="bottom-toil flex items-center justify-between mb-4">
          <span className="top-0 left-5 w-24 h-10 bg-gray-100 flex justify-center items-center rounded-md">
            <IconAirCraftTL width={24} height={24} fill="#9ca3af" />
          </span>
          <span className="top-0 right-5  w-24 h-10 bg-gray-100 flex justify-center items-center rounded-md">
            <IconAirCraftTL width={24} height={24} fill="#9ca3af" />
          </span>
        </div>
        <AirCraftExistDoor className="absolute -left-6 -right-6 pointer-events-none" />
      </div>
    </div>
  );
};
export default memo(AirCraftBottom);
