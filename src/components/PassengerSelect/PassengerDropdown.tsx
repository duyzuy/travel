"use client";
import React, { memo } from "react";
import { PaxType } from "@/constants/enum";
import { QUANTITY_ACTION } from "@/components/Quantity";
import Quantity from "@/components/Quantity";
import { AdultIcon, ChildrenIcon, BabyIcon } from "@/assets/icons";
import Image from "next/image";
import classNames from "classnames";

interface Props {
  onChangeQuantity: (
    type: PaxType,
    data: { action: QUANTITY_ACTION; value: number }
  ) => void;
  adultAmount: number;
  childrenAmount: number;
  infantAmount: number;
}

const PassengerDropdown = ({
  onChangeQuantity,
  adultAmount,
  childrenAmount,
  infantAmount,
}: Props) => {
  return (
    <div
      className={classNames({
        " bg-white px-3 py-2 absolute left-0 right-0 z-20 w-80 drop-shadow-lg":
          true,
      })}
    >
      <div className="box-head">
        <p className="py-4 px-2 font-bold">Số lượng hành khách</p>
      </div>
      <div className="box-body">
        <ul className="passengers">
          <li className="passenger pr-2 py-2 flex justify-between">
            <PassengerDropdown.BaseQuantity
              title="Người lớn"
              subTitle="12 tuổi trở lên"
              value={adultAmount}
              onChange={onChangeQuantity}
              paxType={PaxType.ADULT}
              iconPath={AdultIcon}
            />
          </li>
          <li className="passenger pr-2 py-2 flex justify-between">
            <PassengerDropdown.BaseQuantity
              title="Trẻ em"
              subTitle="2 - 11 tuổi"
              value={childrenAmount}
              onChange={onChangeQuantity}
              paxType={PaxType.CHILDREN}
              iconPath={ChildrenIcon}
            />
          </li>
          <li className="passenger pr-2 py-2 flex justify-between">
            <PassengerDropdown.BaseQuantity
              title="Em bé"
              subTitle="< 2 tuổi"
              value={infantAmount}
              onChange={onChangeQuantity}
              paxType={PaxType.INFANT}
              iconPath={BabyIcon}
            />
          </li>
        </ul>
      </div>
      <div className="box-bottom"></div>
    </div>
  );
};
export default memo(PassengerDropdown);

interface PassengerDropDownQuantity {
  title: string;
  subTitle: string;
  value: number;
  iconPath?: string;
  paxType: PaxType;
  onChange: (
    paxType: PaxType,
    { action, value }: { action: QUANTITY_ACTION; value: number }
  ) => void;
}

PassengerDropdown.BaseQuantity = function PassengerBaseQuantity({
  onChange,
  value,
  subTitle,
  title,
  iconPath,
  paxType,
}: PassengerDropDownQuantity) {
  return (
    <>
      <div className="passenger-type flex items-center">
        {(iconPath && (
          <span className="passenger-icon inline-block mr-1">
            <Image src={iconPath} alt="Adult icon" className="w-8 h-8" />
          </span>
        )) ||
          null}
        <p className="passenger-text">
          <span className="title block">{title}</span>
          <span className="sub-title block text-gray-400 text-sm">
            {subTitle}
          </span>
        </p>
      </div>
      <Quantity
        value={value}
        onChange={(action, value) => onChange(paxType, { action, value })}
      />
    </>
  );
};
