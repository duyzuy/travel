"use client";

import React, { memo } from "react";
import PassengerBoxItem from "./PassengerBoxItem";
import styles from "./passenger-list.module.scss";
import classNames from "classnames";
import { IFlightBookingInformation } from "@/modules/bookingTicket/bookingInformation.interface";
const PassengerBoxList: React.FC<{
  className?: string;
  type?: "vertical" | "horizon";
  passengers: IFlightBookingInformation["passengerInformation"]["passengers"];
}> = ({ className = "", type = "horizon", passengers }) => {
  return (
    <div
      className={classNames({
        [styles.wrapper]: styles.wrapper,
        "passenges-list overflow-x-auto": true,
        [className]: className,
      })}
    >
      <ul
        className={classNames({
          "pax-list text-sm": true,
          "flex items-center": type === "horizon",
        })}
      >
        {passengers.map((passenger) => (
          <PassengerBoxItem
            key={`${passenger.firstName}-${passenger.lastName}`}
            firstName={passenger.firstName}
            lastName={passenger.lastName}
            isSelecting={false}
          />
        ))}
      </ul>
    </div>
  );
};
export default memo(PassengerBoxList);
