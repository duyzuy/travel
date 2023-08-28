"use client";

import React, { memo } from "react";
import classNames from "classnames";
import { IFlightBookingInformation } from "@/modules/bookingTicket/bookingInformation.interface";
import { ISeatOption } from "@/Models/seatMap";
import { FLIGHT_SERVICES } from "@/modules/bookingServices/bookingServices.interface";
export enum PASSENGER_STATUS {
  PROCESS = "process",
  SELECTED = "selected",
  WAITING = "waiting",
}
interface IPassengerBoxItem {
  firstName: string;
  lastName: string;
  status: PASSENGER_STATUS;
  serviceType?: FLIGHT_SERVICES;
  className?: string;
  onSelect?: () => void;
  selectedItem?: string;
}
const PassengerBoxItem = ({
  firstName,
  status = PASSENGER_STATUS.WAITING,
  lastName,
  className = "",
  onSelect,
  serviceType = FLIGHT_SERVICES.SEATS,
  selectedItem = "",
}: IPassengerBoxItem) => {
  return (
    <li
      className={classNames({
        "pax-item flex items-center px-3 py-1 h-16 border rounded-md mr-3 bg-white md:1/3 lg:w-64 cursor-pointer":
          true,
        "border-emerald-500 active": status === PASSENGER_STATUS.PROCESS,
        "shadow-sm": status === PASSENGER_STATUS.WAITING,
        [className]: className,
      })}
      onClick={onSelect}
      style={{
        boxShadow:
          status === PASSENGER_STATUS.PROCESS
            ? "0px 4px 0px 0px rgb(0 0 0 / 8%)"
            : "none",
      }}
    >
      <span className="w-8 h-8 bg-emerald-500 text-white flex items-center justify-center rounded-full mr-2 text-xs font-extrabold uppercase">
        {`${firstName.charAt(0)}${lastName.charAt(0)}`}
      </span>
      <p className="block flex-1" style={{ width: "calc(100% - 2.5rem)" }}>
        <span
          className="block font-bold uppercase text-sm whitespace-nowrap overflow-hidden"
          style={{
            lineClamp: 1,
            boxOrient: "vertical",
            textOverflow: "ellipsis",
            height: "1.4rem",
            lineHeight: "1.4rem",
          }}
        >
          {firstName}, {lastName}
        </span>
        {(status === PASSENGER_STATUS.SELECTED && (
          <PassengerBoxItem.SelectedItem
            service={serviceType}
            itemName={selectedItem}
          />
        )) ||
          (status === PASSENGER_STATUS.PROCESS && selectedItem !== "" && (
            <PassengerBoxItem.SelectedItem
              service={serviceType}
              itemName={selectedItem}
            />
          )) ||
          (status === PASSENGER_STATUS.WAITING && (
            <span className="text-gray-500 text-xs">Chưa chọn</span>
          )) || <span className="text-emerald-500 text-xs">Đang chọn</span>}
      </p>
    </li>
  );
};
export default memo(PassengerBoxItem);

interface IPassengerSelectedItem {
  service: FLIGHT_SERVICES;
  itemName: string;
}
PassengerBoxItem.SelectedItem = function PassengerSelectedItem({
  service,
  itemName,
}: IPassengerSelectedItem) {
  return (
    <span
      className={classNames({
        "block font-bold text-emerald-500": true,
      })}
    >
      {(service === FLIGHT_SERVICES.SEATS && `Ghế: ${itemName}`) ||
        (service === FLIGHT_SERVICES.LUGGAGES && `Gói: ${itemName}`) ||
        (service === FLIGHT_SERVICES.MEALS && `${itemName}`)}
    </span>
  );
};
