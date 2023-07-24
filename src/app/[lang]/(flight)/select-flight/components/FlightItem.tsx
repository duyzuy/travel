"use client";

import { AnimatedComponentMount } from "@/HOCs/AnimatedMount";
import React, { useEffect, useRef, useState } from "react";
import {
  BBBrandIcon,
  VJBrandOneIcon,
  VJBrandTwoIcon,
  VNABrandIcon,
} from "@/assets/icons";
import Image from "next/image";
import Button from "@/components/Button";
import FlightType from "@/components/FlightType";
import FlightInformationDetail from "@/components/FlightInformationDetail";

import styles from "./flight-item.module.scss";
import FlightPriceTicketDetail from "@/components/FlightPriceTicketDetail";
import { FlightDetailItemType } from "@/Models/ticket";
import { formatCurrencyVND } from "@/utils/helper";
type PropsType = {
  oneStop?: boolean;
  flightItemData: FlightDetailItemType;
};
const FlightItem: React.FC<PropsType> = ({
  oneStop = false,
  flightItemData,
}) => {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [isShowPanel, setisShowPanel] = useState(false);
  useEffect(() => {}, []);
  return (
    <div
      className={
        styles.wrapper +
        " flight-item shadow-sm rounded-sm bg-white mb-4 border border-slate-100 hover:border-emerald-600 overflow-hidden transition-colors"
      }
    >
      <div className="item-inner">
        <div className="flight-item-top flex items-center px-4 pt-4">
          <div className="brand flex items-center">
            <Image
              src={VJBrandOneIcon}
              alt="Vietjet"
              width={40}
              height={40}
              className="rounded-full border p-1 mr-2"
            />
            <p className="brand-info ml-2">
              <span className="brand-name block">Vietjet Air</span>
              <span className="flight-number text-sm text-gray-500 block">
                {flightItemData.flightNumber}
              </span>
            </p>
          </div>
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

        <div className="flight-item-bottom" ref={dropDownRef}>
          <div className="inner">
            <div className="flex items-center justify-between px-4 py-2">
              <ul className="action flex items-center text-sm text-gray-600">
                <li className="btn mr-6 py-2 cursor-pointer hover:text-emerald-600 relative">
                  <span>Thông tin chuyến bay</span>
                  {(isShowPanel && (
                    <span className="absolute bottom-0 left-1/2 right-1/2 w-12 h-1 block bg-emerald-600 rounded-tl rounded-tr"></span>
                  )) || <></>}
                </li>
                <li className="btn cursor-pointer">
                  <span>Chi tiết giá vé</span>
                </li>
              </ul>
              <div className="flight-actions text-right">
                <Button
                  color="secondary"
                  size="xs"
                  className="w-24 lg:text-sm"
                  rounded="sm"
                >
                  Chọn
                </Button>
              </div>
            </div>
            <FlightInformationDetail isOpen={false} />
            <FlightPriceTicketDetail isOpen={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightItem;

const FlightItemAnimated = () => {
  return AnimatedComponentMount({
    unMountStyle: {
      opacity: 0,
    },
    mountStyle: {
      opacity: 1,
      transition: "all linear 240ms",
    },
  })(FlightItem);
};
export { FlightItemAnimated };
