"use client";
import React, { memo } from "react";

import classNames from "classnames";
import { FlightTicket } from "@/Models/flight/ticket";
import { format } from "date-fns";
import { FORMAT_DATE } from "@/constants/config";
import { Airline } from "@/Models/flight/airline";
import {
  durationToString,
  getOperationFromFlightNumber,
} from "@/helpers/flightItem";
import Image from "next/image";
import { ITransitTicket } from "@/Models/flight/transitTicket";

interface IFlightTicketDetail {
  isOpen: boolean;
  padding?: "sm" | "md" | "lg";
  ticketInfo: FlightTicket["outbound"];
  airlines: Airline[];
  className?: string;
}

interface IBaseInformation {
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
  operation?: Airline;
  flightNumber: string;
  flightDuration: string;
}

const FlightTicketDetail = ({
  isOpen = false,
  padding = "md",
  ticketInfo,
  airlines,
  className = "",
}: IFlightTicketDetail) => {
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
        {ticketInfo.transitTickets ? (
          <FlightTicketDetail.Transits
            flightTicketsTransits={ticketInfo.transitTickets}
            airlines={airlines}
          />
        ) : (
          <FlightTicketDetail.BaseInformation
            depart={{
              airportName: ticketInfo.departureAirportName,
              airportCode: ticketInfo.departureAirport,
              cityName: ticketInfo.departureCity,
              timeStr: ticketInfo.departureTimeStr,
              dateStr: format(ticketInfo.departureTime, FORMAT_DATE),
            }}
            arrival={{
              airportName: ticketInfo.arrivalAirportName,
              cityName: ticketInfo.arrivalCity,
              airportCode: ticketInfo.arrivalAirport,
              timeStr: ticketInfo.arrivalTimeStr,
              dateStr: format(ticketInfo.arrivalTime, FORMAT_DATE),
            }}
            flightDuration={durationToString(ticketInfo.duration)}
            flightNumber={ticketInfo.flightNumber}
            operation={getOperationFromFlightNumber(
              airlines,
              ticketInfo.flightNumber
            )}
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

export default memo(FlightTicketDetail);

FlightTicketDetail.BaseInformation = function FlightTicketDetailBaseInformation(
  props: IBaseInformation
) {
  const { depart, arrival, operation, flightDuration, flightNumber } = props;
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
        <div className="py-6 flex-1 flex items-center">
          {operation ? (
            <div className="brand-name flex items-center">
              <span className="relative w-6 h-6 mr-2">
                <Image
                  src={operation.logo}
                  alt={operation.name}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </span>
              <p className="inline-block text-sm flex-1">{operation.name}</p>
            </div>
          ) : null}
          <p className="text-sm text-gray-600">
            <span className="text-xs mx-2">|</span>
            <span>{flightNumber}</span>
          </p>
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

FlightTicketDetail.Transits = function FlightTicketDetailTransits(props: {
  flightTicketsTransits: ITransitTicket[];
  airlines: Airline[];
}) {
  const { flightTicketsTransits, airlines } = props;

  return (
    <>
      {flightTicketsTransits.map((transit, _transitInd) => (
        <React.Fragment
          key={`${transit.departureAirport}-${transit.arrivalAirport}`}
        >
          {_transitInd !== 0 && (
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
                    {transit.departureAirport}
                    <span className="mx-1">
                      ({transit.departureAirportName})
                    </span>
                  </span>
                  {transit.flightDuration}
                </p>
              </div>
            </div>
          )}
          <FlightTicketDetail.BaseInformation
            depart={{
              airportName: transit.departureAirportName,
              airportCode: transit.departureAirport,
              cityName: transit.departureCity,
              timeStr: transit.departureTimeStr,
              dateStr: transit.departureDayStr,
            }}
            arrival={{
              airportName: transit.arrivalAirportName,
              cityName: transit.arrivalCity,
              airportCode: transit.arrivalAirport,
              timeStr: transit.arrivalTimeStr,
              dateStr: transit.arrivalDayStr,
            }}
            flightDuration={durationToString(transit.flightDuration)}
            flightNumber={transit.flightNumber}
            operation={getOperationFromFlightNumber(
              airlines,
              transit.flightNumber
            )}
          />
        </React.Fragment>
      ))}
    </>
  );
};
