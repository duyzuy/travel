"use client";
import React, { memo } from "react";
import Image from "next/image";
import { Airline } from "@/Models/airline";
import classNames from "classnames";
const FlightOperation: React.FC<{
  operation?: Airline;
  flightNumber: string;
  className?: string;
  thumbnailUrl?: string;
}> = ({ flightNumber, className = "", operation }) => {
  return (
    <div
      className={classNames({
        "brand flex items-center": true,
        [className]: className,
      })}
    >
      <span className="relative rounded-full mr-2 block w-8 h-8">
        {operation ? (
          <Image
            src={operation.logo}
            alt={operation.name}
            fill
            sizes="100px"
            style={{ objectFit: "contain" }}
          />
        ) : null}
      </span>
      <p className="brand-info flex-1">
        <span className="brand-name block text-sm">{operation?.name}</span>
        <span className="flight-number text-xs text-gray-500 block">
          {flightNumber}
        </span>
      </p>
    </div>
  );
};
export default memo(FlightOperation);
