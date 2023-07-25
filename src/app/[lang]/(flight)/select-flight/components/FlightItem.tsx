"use client";

import { AnimatedComponentMount } from "@/HOCs/AnimatedMount";
import React, { useCallback, useEffect, useRef, useState, memo } from "react";
import {
  BBBrandIcon,
  VJBrandOneIcon,
  VJBrandTwoIcon,
  VNABrandIcon,
} from "@/assets/icons";
import Image from "next/image";
import FlightType from "@/components/FlightType";

import styles from "./flight-item.module.scss";

import { FlightDetailItemType } from "@/Models/ticket";
import { formatCurrencyVND } from "@/utils/helper";

import classNames from "classnames";
import FlightItemPanelAndSubmit from "./FlightItemPanelAndSubmit";
import { OnSelectFlightType } from "./FlightItems/BookingFlightItems";
import { Direction } from "@/Models/booking";
import { Airline } from "@/Models/airline";
import BrandNameAirline from "@/app/[lang]/components/BrandNameAirline";
type PropsType = {
  oneStop?: boolean;
  flightItemData: FlightDetailItemType;
  direction: Direction;
  tid: string;
  onSelectFlight: OnSelectFlightType;
  isSelected: boolean;
  airline?: Airline | undefined;
};
const FlightItem: React.FC<PropsType> = ({
  oneStop = false,
  flightItemData,
  direction,
  tid,
  isSelected = false,
  onSelectFlight,
  airline,
}) => {
  return (
    <div
      className={
        styles.wrapper +
        classNames({
          " flight-item shadow-sm rounded-sm bg-white mb-4 border  overflow-hidden transition-colors":
            true,
          "border-slate-100 hover:border-emerald-600": !isSelected,
          "isSelected border-emerald-600": isSelected,
        })
      }
    >
      <div className="item-inner">
        <div className="flight-item-top flex items-center px-4 pt-4">
          {(airline && (
            <BrandNameAirline
              airline={airline}
              flightNumber={flightItemData.flightNumber}
            />
          )) || <></>}

          <div className="left flex items-center px-6 flex-1 justify-center">
            <span className="trip-from-info">
              <span className="time block text-xl">
                {flightItemData.departureTimeStr}
              </span>
              <span className="code block text-gray-500 text-sm">
                {flightItemData.departureAirport}
              </span>
            </span>
            <FlightType
              oneStop={oneStop}
              durationTime={flightItemData.duration}
            />
            <span className="trip-from-info text-right">
              <span className="time block  text-xl">
                {flightItemData.arrivalTimeStr}
              </span>
              <span className="code block text-gray-500 text-sm">
                {flightItemData.arrivalAirport}
              </span>
            </span>
          </div>
          <div className="right">
            <div className="price mb-2">
              <span className="amount text-xl font-bold text-emerald-600">
                {formatCurrencyVND(flightItemData.ticketdetail.farePrice)}
              </span>
            </div>
          </div>
        </div>

        <FlightItemPanelAndSubmit
          data={flightItemData}
          onSelectFlight={onSelectFlight}
          direction={direction}
          tid={tid}
        />
      </div>
    </div>
  );
};

export default memo(FlightItem);

// const FlightItemAnimated = () => {
//   return AnimatedComponentMount({
//     unMountStyle: {
//       opacity: 0,
//     },
//     mountStyle: {
//       opacity: 1,
//       transition: "all linear 240ms",
//     },
//   })(FlightItem);
// };
// export { FlightItemAnimated };
