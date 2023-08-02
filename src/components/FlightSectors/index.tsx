"use client";

import { Direction, TripType } from "@/constants/enum";
import React, { CSSProperties, memo } from "react";
import classNames from "classnames";
import styles from "./flight-sector.module.scss";
const FlightSectors: React.FC<{
  type?: "tab" | "slide";
  tripType?: TripType;
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
  direction?: Direction;
}> = ({
  style,
  type = "tab",
  tripType = TripType.ROUND_TRIP,
  size = "md",
  direction = Direction.OUT_BOUND,
}) => {
  return (
    <div
      className={classNames({
        [styles.wrapper]: styles.wrapper,
        "flight-sectors flex items-center": true,
      })}
      style={style}
    >
      <div
        className={classNames({
          "sector w-1/2 border-t-4 rounded-tl-md rounded-tr-md relative bg-white":
            true,
          "px-4 py-2": size === "sm",
          "px-3 py-3 lg:px-6 lg:py-4": size === "md",
          "px-8 py-4": size === "lg",
          "border-emerald-500 active-right z-10":
            direction === Direction.OUT_BOUND,
          "border-b-2": direction !== Direction.OUT_BOUND,
        })}
      >
        <div className="inner-sector">
          <p className="text-sm text-gray-600">Chuyến đi</p>
          <p className="flex items-center">
            <span>Tp. Ho Chi Minh (SGN)</span>
            <span className="mx-2">
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
            <span>Ha Noi (HAN)</span>
          </p>
        </div>
      </div>
      <div
        className={classNames({
          "sector w-1/2 border-t-4 rounded-tl-md rounded-tr-md bg-white": true,
          "px-4 py-2": size === "sm",
          "px-3 py-3 lg:px-6 lg:py-4": size === "md",
          "px-8 py-4": size === "lg",
          "border-emerald-500 active-left z-10":
            direction === Direction.IN_BOUND,
          "border-b-2": direction !== Direction.IN_BOUND,
        })}
      >
        <div className="inner-sector">
          <p className="text-sm text-gray-600">Chuyến về</p>
          <p className="flex items-center">
            <span>Ha Noi (HAN)</span>
            <span className="mx-2">
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
            <span>Tp. Ho Chi Minh (SGN)</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default memo(FlightSectors);
