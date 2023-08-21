"use client";

import React, { memo } from "react";
import Image from "next/image";
import { Airline } from "@/Models";

const FlightDetailItem: React.FC<{
  depart: {
    timeStr: string;
    cityName: string;
    airportName: string;
    dateStr: string;
    airportCode: string;
  };
  arrival: {
    timeStr: string;
    cityName: string;
    airportName: string;
    dateStr: string;
    airportCode: string;
  };
  airline?: Airline;
  flightNumber: string;
  flightDuration: string;
}> = ({ depart, arrival, airline, flightDuration, flightNumber }) => {
  return (
    <>
      <ul className="flex items-center">
        <li className="w-28 mr-10">
          <span className="detail-time block">{depart.timeStr}</span>
          <span className="detail-date block text-gray-600 text-sm">
            {depart.dateStr}
          </span>
        </li>
        <li className="flex-1">
          <span className="block">
            {depart.cityName} - {depart.airportCode}
          </span>
          <span className="block text-gray-500 text-sm">
            {depart.airportName}
          </span>
        </li>
      </ul>
      <div className="flex items-center">
        <div className="duration w-28 mr-10">
          <span className="text-sm text-gray-400">{flightDuration}</span>
        </div>
        <div className="py-6 flex-1">
          <div className="flex items-center">
            <div className="flex-1 flex items-center">
              {(airline && (
                <div className="brand-name flex items-center">
                  <span className="relative w-6 h-6 mr-2">
                    <Image
                      src={airline.logo}
                      alt={airline.logo}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </span>
                  <p className="inline-block text-sm flex-1">{airline.name}</p>
                </div>
              )) || <></>}
              <p className="text-sm text-gray-600">
                <span className="text-xs mx-2">|</span>
                <span>{flightNumber}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ul className="flex items-center">
        <li className="w-28 mr-10">
          <span className="detail-time block">{arrival.timeStr}</span>
          <span className="detail-date block text-gray-600 text-sm">
            {arrival.dateStr}
          </span>
        </li>
        <li>
          <span className="block">
            {arrival.cityName} - {arrival.airportCode}
          </span>
          <span className="text-gray-500 text-sm">{arrival.airportName}</span>
        </li>
      </ul>
    </>
  );
};

export default memo(FlightDetailItem);
