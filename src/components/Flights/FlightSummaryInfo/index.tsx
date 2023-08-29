"use client";

import { Airline } from "@/Models/flight/airline";
import Image from "next/image";
interface IFlightSummaryInfo {
  departureCode: string;
  departureCity: string;
  arrivalCode: string;
  arrivalCity: string;
  departureTimeStr: string;
  departureDayStr: string;
  arrivalTimeStr: string;
  arrivalDayStr: string;
  airline?: Airline;
  flightNumber: string;
  flightType: string;
}
const FlightSummaryInfo: React.FC<IFlightSummaryInfo> = ({
  flightNumber,
  departureCode,
  arrivalCode,
  departureDayStr,
  arrivalCity,
  arrivalTimeStr,
  arrivalDayStr,
  airline,
  departureTimeStr,
  departureCity,
  flightType,
}) => {
  return (
    <div className="box-sector">
      <div className="flight-detail-head">
        <div className="collapse-head">
          <p className="flex items-center">
            <span>{`${departureCity} (${departureCode})`}</span>
            <span className="mx-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </span>
            <span>{`${arrivalCity} (${arrivalCode})`}</span>
          </p>
          <div className="text-xs text-gray-600 py-2">
            <div className="border-l border-dashed pl-4 ml-12">
              <p className="flex items-center -ml-16">
                <span className="w-10">{departureTimeStr}</span>
                <span className="mr-4 bg-white w-4 h-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="12"
                    height="12"
                    fill="#11b981"
                    className="rotate-90"
                  >
                    <path d="m186.62 464h-26.62a16 16 0 0 1 -14.57-22.6l64.46-142.25-96.79-2.15-35.3 42.77c-6.73 8.46-12.1 12.23-25.8 12.23h-17.92a17.66 17.66 0 0 1 -14.7-7.06c-2.38-3.21-4.72-8.65-2.44-16.41l19.82-71c.15-.53.33-1.06.53-1.58a.38.38 0 0 0 0-.15 14.82 14.82 0 0 1 -.53-1.59l-19.84-71.45c-2.15-7.61.2-12.93 2.56-16.06a16.83 16.83 0 0 1 13.6-6.7h18.92c10.23 0 20.16 4.59 26 12l34.57 42.05 97.32-1.44-64.44-142a16 16 0 0 1 14.55-22.61h26.91a25 25 0 0 1 19.35 9.8l125.05 152 57.77-1.52c4.23-.23 15.95-.31 18.66-.31 55.26.03 88.26 17.97 88.26 48.03 0 9.46-3.78 27-29.07 38.16-14.93 6.6-34.85 9.94-59.21 9.94-2.68 0-14.37-.08-18.66-.31l-57.76-1.54-125.36 152a25 25 0 0 1 -19.32 9.75z"></path>
                  </svg>
                </span>
                <span>{departureDayStr}</span>
              </p>
              {airline ? (
                <div className="flex items-center py-2">
                  <Image
                    src={airline.logo}
                    alt={airline.name}
                    width={30}
                    height={30}
                  />
                  <p className="flex items-center">
                    <span>{airline.name}</span>
                    <span className="mx-1">|</span>
                    <span>{flightNumber}</span>
                    <span className="mx-1">|</span>
                    <span>{flightType}</span>
                  </p>
                </div>
              ) : null}
              <p className="flex items-center -ml-16">
                <span className="w-10">{arrivalTimeStr}</span>
                <span className="mr-4 w-4 h-4 flex items-center justify-center bg-white">
                  <span className="w-1 h-1 block bg-gray-400 rounded-full"></span>
                </span>
                <span>{arrivalDayStr}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FlightSummaryInfo;
