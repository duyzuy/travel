"use client";
import React, { memo } from "react";
import { VJBrandOneIcon } from "@/assets/icons";
import Image, { StaticImageData } from "next/image";
import classNames from "classnames";

export enum SECTOR_STATUS {
  SELECTED = "selected",
  IN_PROCESS = "in_process",
  WAITING = "waiting",
}

interface IFlightSectorItem {
  depart: string;
  arrival: string;
  sector: "inbound" | "outbound";
  departDate: string;
  status: SECTOR_STATUS;
  labelText: string;
}
const FlightSector = ({
  depart,
  arrival,
  sector,
  departDate = "T3, 15 tháng 8",
  status,
  labelText = "Chuyến đi",
}: IFlightSectorItem) => {
  return (
    <>
      <div
        className={classNames({
          "flight-trip relatvie trip-from px-6 py-4 w-full md:w-1/2 selecting border bg-white rounded-md drop-shadow-sm border-emerald-500 relative":
            true,
        })}
      >
        <span className="inline-block text-emerald-600">{labelText}</span>
        <div className="flight-trip flex items-center">
          <span className="text-lg">{depart}</span>
          <span className="icon mx-3">
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
          <span className="text-lg">{arrival}</span>
        </div>
        <div className="line border-b my-3"></div>
        <div className="flex items-center justify-between">
          <FlightSector.FlightInfo
            thumbnailUrl={VJBrandOneIcon}
            flightNumber="VJ147"
            brandName="VietjetAir"
            arrivalTime="17 20"
            departureTime="15 20"
            arrivalCode="SGN"
            departureCode="HAN"
            durationTime="123"
            flightTypeName="1 điểm dừng"
          />
          <span className="px-3 py-1 text-xs border border-emerald-400 text-emerald-500 rounded-sm">
            Thay đổi
          </span>
        </div>
      </div>
    </>
  );
};
export default memo(FlightSector);

interface IFlightSectorInformation {
  thumbnailUrl: string | StaticImageData;
  flightNumber: string;
  departureTime: string;
  departureCode: string;
  arrivalCode: string;
  arrivalTime: string;
  brandName: string;
  durationTime: string;
  flightTypeName: string;
}
FlightSector.FlightInfo = function FlightSectorInformation({
  thumbnailUrl,
  flightNumber,
  brandName,
  durationTime,
  arrivalCode,
  arrivalTime,
  departureCode,
  departureTime,
  flightTypeName,
}: IFlightSectorInformation) {
  return (
    <div className="sector-info flex items-center">
      <div className="flightInfo flex items-center mr-4">
        <span className="trip-from-info">
          <span className="time block text-lg">{departureTime}</span>
          <span className="code block text-gray-500 text-sm">
            {departureCode}
          </span>
        </span>
        <span className="pointers w-16 relative h-2 my-1 flex items-center mx-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="16"
            height="16"
            fill="#11b981"
          >
            <path d="m186.62 464h-26.62a16 16 0 0 1 -14.57-22.6l64.46-142.25-96.79-2.15-35.3 42.77c-6.73 8.46-12.1 12.23-25.8 12.23h-17.92a17.66 17.66 0 0 1 -14.7-7.06c-2.38-3.21-4.72-8.65-2.44-16.41l19.82-71c.15-.53.33-1.06.53-1.58a.38.38 0 0 0 0-.15 14.82 14.82 0 0 1 -.53-1.59l-19.84-71.45c-2.15-7.61.2-12.93 2.56-16.06a16.83 16.83 0 0 1 13.6-6.7h18.92c10.23 0 20.16 4.59 26 12l34.57 42.05 97.32-1.44-64.44-142a16 16 0 0 1 14.55-22.61h26.91a25 25 0 0 1 19.35 9.8l125.05 152 57.77-1.52c4.23-.23 15.95-.31 18.66-.31 55.26.03 88.26 17.97 88.26 48.03 0 9.46-3.78 27-29.07 38.16-14.93 6.6-34.85 9.94-59.21 9.94-2.68 0-14.37-.08-18.66-.31l-57.76-1.54-125.36 152a25 25 0 0 1 -19.32 9.75z"></path>
          </svg>
          <span className="line flex-1 w-full border-t border-slate-200 block"></span>
          <span className="poin-start w-2 h-2 bg-slate-200 block rounded-full right-0"></span>
        </span>
        <span className="trip-from-info text-right">
          <span className="time block text-lg">{arrivalTime}</span>
          <span className="code block text-gray-500 text-sm">
            {arrivalCode}
          </span>
        </span>
      </div>
      <div className="brand-name items-center">
        {(thumbnailUrl && (
          <p className="flex items-center">
            <span className="relative block w-6 h-6 mr-2">
              <Image
                src={thumbnailUrl}
                alt="viet"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-full block mr-2"
              />
            </span>
            <span className="text-sm">{brandName}</span>
          </p>
        )) ||
          null}
        <p className="flex items-center text-xs text-gray-600">
          <span className="">{brandName}</span>
          <span className="space text-sx mx-1">|</span>
          <span>{flightNumber}</span>
          <span className="space text-sx mx-1">|</span>
          <span>{flightTypeName}</span>
        </p>
      </div>
    </div>
  );
};
