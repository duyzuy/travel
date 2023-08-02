"use client";

import React, { memo } from "react";
import PassengerItem from "./PassengerItem";
import styles from "./passenger-list.module.scss";
import classNames from "classnames";
const PassengerList: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const PAX_LIST = [
    {
      id: "vtd",
      firstName: "VU",
      lastName: "TRUONG DUY",
      seat: "",
      current: true,
    },
    {
      id: "nhat",
      firstName: "NGUYEN",
      lastName: "HOANG ANH THU",
      seat: "1D",
      current: false,
    },
    {
      id: "vnda",
      firstName: "VU",
      lastName: "NGUYEN DUY ANH",
      seat: "",
      current: false,
    },
    {
      id: "vnda22",
      firstName: "VU",
      lastName: "NGUYEN THAI TRUNG",
      seat: "",
      current: false,
    },
    {
      id: "vnda2",
      firstName: "DAU",
      lastName: "VU HA MY",
      seat: "",
      current: false,
    },
  ];
  return (
    <div
      className={classNames({
        [styles.wrapper]: styles.wrapper,
        "passenges-list overflow-x-auto": true,
        [className]: className,
      })}
    >
      <ul className="pax-list flex items-center text-sm">
        {PAX_LIST.map((item) => (
          <PassengerItem key={item.id} data={item} isSelecting={item.current} />
        ))}
      </ul>
    </div>
  );
};
export default memo(PassengerList);
