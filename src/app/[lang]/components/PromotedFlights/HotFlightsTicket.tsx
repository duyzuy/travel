"use client";
import React, { memo, useState, useRef, useMemo, useCallback } from "react";

import {
  TypeAirLine,
  TypeAirportItem,
  TypeHotTickets,
} from "@/Models/hotFlight";
import classNames from "classnames";
import { useClickOutSide } from "@/hooks/useClickOutSide";
import {
  VNABrandIcon,
  BBBrandIcon,
  VJBrandOneIcon,
  AirCraftRightIcon,
} from "@/assets/icons";
import Image from "next/image";
import { formatCurrencyVND } from "@/utils/helper";
const HotFlightsTicket: React.FC<{
  airlines: TypeAirLine[];
  airports: TypeAirportItem[];
  hotTickets: TypeHotTickets;
}> = ({ airlines, airports, hotTickets }) => {
  const [airportSelection, setAirportSelection] = useState<{
    current: TypeAirportItem;
    isShowing: boolean;
  }>({
    current: {
      code: "SGN",
      airportName: "Sân bay Tân Sơn Nhất",
      cityName: "Tp Hồ Chí Minh",
    },
    isShowing: false,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutSide(dropdownRef, () => {
    setAirportSelection((prev) => ({
      ...prev,
      isShowing: false,
    }));
  });

  const onShowDropdown = () => {
    setAirportSelection((prev) => ({
      ...prev,
      isShowing: true,
    }));
  };
  const onSelectAirport = (airport: TypeAirportItem) => {
    setAirportSelection((prev) => ({
      isShowing: false,
      current: {
        ...airport,
      },
    }));
  };

  const flightsListByAirports = useMemo(() => {
    const output = hotTickets.filter(
      (item) => item.itinerary.fromAirport === airportSelection.current.code
    );

    return output;
  }, [airportSelection.current, hotTickets]);

  const getAirportName = useCallback(
    (code: string) => {
      const item = airports.find((item) => item.code === code);
      (item && item.cityName) || "";

      return (item && item.cityName) || "";
    },
    [airports]
  );
  return (
    <div className="container mx-auto">
      <div className="section-head py-3 mb-3">
        <div className="selection-title block md:flex md:items-center text-center">
          <h3 className="text-xl md:text-3xl text-center">
            Chuyến bay giá tốt khởi hành từ
          </h3>
          <div className="hotflight-selection relative inline-block">
            <div
              className="selection-showing inline-flex items-center px-2 py-3 text-primary-default cursor-pointer"
              onClick={onShowDropdown}
            >
              <span className="text-primary-default text-xl md:text-3xl block">
                {airportSelection.current.cityName}
              </span>
              <span className="icon ml-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>
            {(airportSelection.isShowing && (
              <div
                className="selection-dropdown absolute w-56 shadow-lg bg-white z-10 text-left"
                ref={dropdownRef}
              >
                {airports.map((airport, index) => (
                  <div
                    className={classNames({
                      "option px-4 py-3 hover:bg-gray-200 cursor-pointer": true,
                      active: airportSelection.current.code === airport.code,
                    })}
                    key={`${airport.code}-${index}`}
                    onClick={() => onSelectAirport(airport)}
                  >
                    <p
                      className={classNames({
                        current: airportSelection.current.code === airport.code,
                      })}
                    >
                      {airport.cityName}
                    </p>
                  </div>
                ))}
              </div>
            )) || <></>}
          </div>
        </div>
        <p className="md:text-left text-center">
          Giá tốt nhất từ VietnamAirlines, Bamboo, Vietjet
        </p>
      </div>
      <div className="section-body">
        <div className="flights ">
          {flightsListByAirports &&
            flightsListByAirports.map((ticket) => (
              <div
                className="wrapper ticket-item flex items-center flex-wrap md:-mx-2"
                key={`ticket-${ticket.itinerary.fromAirport}-${ticket.itinerary.toAirport}`}
              >
                {ticket.priceOptions.map((priceOption, index) => (
                  <div
                    className="ticket-item w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-6"
                    key={`trip-${priceOption.flightCode}-${index}`}
                  >
                    <div className="inner-item p-3 border rounded-md shadow-lg">
                      <div className="brand mb-3">
                        {
                          <Image
                            src={
                              (priceOption.flightCode.includes("VN") &&
                                VNABrandIcon) ||
                              (priceOption.flightCode.includes("VJ") &&
                                VJBrandOneIcon) ||
                              BBBrandIcon
                            }
                            alt={
                              (priceOption.flightCode.includes("VN") &&
                                "Vietnam airline") ||
                              (priceOption.flightCode.includes("VJ") &&
                                "Vietjet") ||
                              "Bamboo"
                            }
                            width={50}
                            height={50}
                            className="rounded-full p-1 border shadow-md border-gray-100"
                          />
                        }
                      </div>
                      <div className="destination items-center">
                        <p className="flex items-center trip-destination">
                          <span className="block trip-from">
                            {getAirportName(ticket.itinerary.fromAirport)}
                          </span>
                          <span className="block w-4 h-4 mx-3">
                            <Image
                              src={AirCraftRightIcon}
                              alt="icon"
                              width={20}
                            />
                          </span>
                          <span className="block trip-to">
                            {getAirportName(ticket.itinerary.toAirport)}
                          </span>
                        </p>
                        <p className="trip-date py-2">
                          <span className="text-sm">Khởi hành lúc:</span>
                          <span className="flex items-center">
                            <span className="block text-sm mr-2">
                              {priceOption.departureTime}
                            </span>
                            <span className="block text-sm ">
                              {priceOption.departureDate}
                            </span>
                          </span>
                        </p>
                      </div>
                      <div className="price flex items-center justify-between">
                        <p className="font-bold text-sky-700">
                          {formatCurrencyVND(priceOption.totalPrice)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default memo(HotFlightsTicket);
