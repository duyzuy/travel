"use client";
import React, { memo } from "react";
import Image from "next/image";
import { Airline } from "@/Models/airline";
const BrandNameAirline: React.FC<{
  airline: Airline;
  flightNumber: string;
}> = ({ airline, flightNumber }) => {
  return (
    <>
      <div className="brand flex items-center">
        <Image
          src={airline.logo}
          alt={airline.name}
          width={40}
          height={40}
          className="rounded-full border p-1 mr-2"
        />
        <p className="brand-info ml-2">
          <span className="brand-name block">{airline.name}</span>
          <span className="flight-number text-sm text-gray-500 block">
            {flightNumber}
          </span>
        </p>
      </div>
    </>
  );
};
export default memo(BrandNameAirline);
