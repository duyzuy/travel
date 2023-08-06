"use client";
import React, { memo } from "react";
import Image from "next/image";
import { Airline } from "@/Models/airline";
import classNames from "classnames";
const BrandNameAirline: React.FC<{
  airline?: Airline;
  flightNumber: string;
  className?: string;
}> = ({ airline, flightNumber, className = "" }) => {
  return (
    <>
      {(airline && (
        <div
          className={classNames({
            "brand flex items-center": true,
            [className]: className,
          })}
        >
          <span className="relative rounded-full mr-2 block w-8 h-8">
            <Image
              src={airline.logo}
              alt={airline.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </span>
          <p className="brand-info flex-1">
            <span className="brand-name block text-sm">{airline.name}</span>
            <span className="flight-number text-xs text-gray-500 block">
              {flightNumber}
            </span>
          </p>
        </div>
      )) || <></>}
    </>
  );
};
export default memo(BrandNameAirline);
