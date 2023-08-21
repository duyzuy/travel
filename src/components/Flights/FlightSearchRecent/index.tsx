"use client";

import React, { memo } from "react";
import classNames from "classnames";
interface IFlightSearchRecent {
  recentItems: {
    id: string;
    depart: { code: string; cityName: string };
    arrival: { code: string; cityName: string };
    dateStr: string;
  }[];
  labelText: string;
  className?: string;
  isOpen: boolean;
}
const FlightSearchRecent: React.FC<IFlightSearchRecent> = ({
  recentItems,
  labelText = "Tìm kiểm gần đây",
  className = "",
  isOpen,
}) => {
  return (
    <>
      {isOpen ? (
        <div
          className={classNames({
            "history-search": true,
            [className]: className,
          })}
        >
          <h4 className="font-bold text-sm mb-2">{labelText}</h4>
          <div className="recent-search">
            <ul>
              {recentItems.map((item) => (
                <li className="item inline-flex px-2 py-1 bg-gray-100 text-sm rounded-sm mr-2 items-center">
                  <span className="flex items-center">
                    <span> {`${item.depart.code} - ${item.arrival.code}`}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 mx-2"></span>
                    <span>{item.dateStr}</span>
                  </span>
                  <span className="remove inline-block ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default memo(FlightSearchRecent);
