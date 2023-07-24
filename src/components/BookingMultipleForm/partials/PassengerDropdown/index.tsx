"use client";
import React, { memo } from "react";
import styles from "./PassengerDropdown.module.scss";
import { PaxType } from "@/Models/booking";
import AdultQuantity from "./AdultQuantity";
import InfantQuantity from "./InfantQuantity";
import ChildrenQuantity from "./ChildrenQuantity";
const PassengerDropdown: React.FC<{
  onChangeQuantity: (
    type: PaxType,
    data: { action: "minus" | "plus"; value: number }
  ) => void;
  adultAmount: number;
  childrenAmount: number;
  infantAmount: number;
}> = ({ onChangeQuantity, adultAmount, childrenAmount, infantAmount }) => {
  return (
    <div
      className={
        styles.wrapper +
        " bg-white px-3 py-2 w-full absolute left-0 right-0 z-20 "
      }
    >
      <div className="box-head"></div>
      <div className="box-body">
        <ul className={styles.passengers}>
          <li className="passenger pr-2 py-2 flex justify-between">
            <AdultQuantity
              title="Người lớn"
              subTitle="12 tuổi trở lên"
              value={adultAmount}
              onChange={onChangeQuantity}
            />
          </li>
          <li className="passenger pr-2 py-2 flex justify-between">
            <ChildrenQuantity
              title="Trẻ em"
              subTitle="2 - 11 tuổi"
              value={childrenAmount}
              onChange={onChangeQuantity}
            />
          </li>
          <li className="passenger pr-2 py-2 flex justify-between">
            <InfantQuantity
              title="Em bé"
              subTitle="< 2 tuổi"
              value={infantAmount}
              onChange={onChangeQuantity}
            />
          </li>
        </ul>
      </div>
      <div className="box-bottom"></div>
    </div>
  );
};
export default memo(PassengerDropdown);
