"use client";
import React, { memo, useCallback } from "react";

import classNames from "classnames";
import { FlightDetailItemType } from "@/Models/ticket";
import { format } from "date-fns";
import { FORMAT_DATE } from "@/constants/config";
import FlightDetailItem from "./FlightDetailItem";
import { Airlines } from "@/Models";

type PropsType = {
  isOpen: boolean;
  padding?: "sm" | "md" | "lg";
  data: FlightDetailItemType;
  airlines: Airlines;
  className?: string;
};

const FlightInformationDetail: React.FC<PropsType> = ({
  isOpen = false,
  padding = "md",
  data,
  airlines,
  className = "",
}) => {
  const getBrandNameFromFlightNumber = useCallback((flightCode: string) => {
    return airlines.find((item) => flightCode.includes(item.code));
  }, []);

  const durationToTimeStr = (duration: number) => {
    const h = Math.floor(duration / (60 * 60 * 1000));
    const minute = Math.floor((duration / (60 * 1000)) % 60);
    return `${h}h ${minute}p`;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flight-item-detail bg-white">
      <div
        className={classNames({
          "info relative": true,
          "p-6": padding === "lg",
          "p-4": padding === "md",
          "p-2": padding === "sm",
          [className]: className,
        })}
      >
        {(data.ticketdetail.numStops !== 0 &&
          data.transitTickets &&
          data.transitTickets.map((transit, ind) => (
            <React.Fragment key={transit.departureAirport}>
              {ind !== 0 && (
                <div className="space -mx-4">
                  <div className="inner bg-gray-50 px-4 py-2 rounded-sm my-8 relative z-10 text-sm flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 mr-2 fill-sky-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p>
                      Dừng nối chuyến tại
                      <span className="text-emerald-500 mx-1">
                        {transit.departureAirportName}
                        <span className="mx-1">
                          ({transit.departureAirport})
                        </span>
                      </span>
                      {`${durationToTimeStr(transit.transitDuration)}`}
                    </p>
                  </div>
                </div>
              )}
              <FlightDetailItem
                depart={{
                  airportName: transit.departureAirportName,
                  cityName: transit.departureCity,
                  timeStr: transit.departureTimeStr,
                  dateStr: transit.departureDayStr,
                  airportCode: transit.departureAirport,
                }}
                arrival={{
                  airportName: transit.arrivalAirportName,
                  cityName: transit.arrivalCity,
                  timeStr: transit.arrivalTimeStr,
                  dateStr: transit.arrivalDayStr,
                  airportCode: transit.arrivalAirport,
                }}
                flightDuration={durationToTimeStr(transit.flightDuration)}
                flightNumber={transit.flightNumber}
                airline={getBrandNameFromFlightNumber(transit.flightNumber)}
              />
            </React.Fragment>
          ))) || (
          <FlightDetailItem
            depart={{
              airportName: data.departureAirportName,
              airportCode: data.departureAirport,
              cityName: data.departureCity,
              timeStr: data.departureTimeStr,
              dateStr: format(data.departureTime, FORMAT_DATE),
            }}
            arrival={{
              airportName: data.arrivalAirportName,
              cityName: data.arrivalCity,
              airportCode: data.arrivalAirport,
              timeStr: data.arrivalTimeStr,
              dateStr: format(data.arrivalTime, FORMAT_DATE),
            }}
            flightDuration={durationToTimeStr(data.duration)}
            flightNumber={data.flightNumber}
            airline={getBrandNameFromFlightNumber(data.flightNumber)}
          />
        )}
        <div className="line-bar absolute top-8 bottom-12 flex flex-col items-center justify-between pointer-events-none left-28">
          <span className="start w-2 h-2 rounded-full border border-emerald-600 block"></span>
          <span className="start border-l h-full border-slate-200 block"></span>
          <span className="start w-2 h-2 rounded-full bg-emerald-500 block"></span>
        </div>
      </div>
    </div>
  );
};

export default memo(FlightInformationDetail);
