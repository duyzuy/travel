"use client";

import React, { memo, useCallback } from "react";
import { FlightDetailItemType } from "@/Models/ticket";
import { formatCurrencyVND } from "@/utils/helper";
import classNames from "classnames";
import FlightItemActions from "./FlightItemActions";
import { OnSelectFlightType } from "../FlightItems/BookingFlightItems";
import { Direction } from "@/constants/enum";
import { Airlines } from "@/Models/airline";
import BrandNameAirline from "@/app/[lang]/components/BrandNameAirline";
import { AnimatedComponentMount } from "@/HOCs/AnimatedMount";
import styles from "./flight-item.module.scss";
import FlightItemDuration from "@/components/FlightItemDuration";
type PropsType = {
  oneStop?: boolean;
  flightItemData: FlightDetailItemType;
  direction: Direction;
  tid: string;
  onSelectFlight: OnSelectFlightType;
  isSelected: boolean;
  airlines: Airlines;
};
const FlightItem: React.FC<PropsType> = ({
  flightItemData,
  direction,
  tid,
  isSelected = false,
  onSelectFlight,
  airlines,
}) => {
  const getBrandNameFromFlightNumber = useCallback((flightCode: string) => {
    return airlines.find((item) => flightCode.includes(item.code));
  }, []);
  const { flightNumber } = flightItemData;
  return (
    <div
      className={
        styles.wrapper +
        classNames({
          " flight-item shadow-sm rounded-sm bg-white mb-4 border  overflow-hidden transition-colors":
            true,
          "border-slate-100 hover:border-emerald-500": !isSelected,
          "isSelected border-emerald-500": isSelected,
        })
      }
    >
      <div className="item-inner">
        <div className="flight-item-top flex items-center px-4 pt-4">
          <BrandNameAirline
            airline={getBrandNameFromFlightNumber(flightNumber)}
            flightNumber={flightNumber}
            className="w-44"
          />
          <FlightItemDuration data={flightItemData} />
          <div className="right w-44 text-right">
            <div className="price ">
              <span className="amount text-xl font-bold text-emerald-500 drop-shadow-sm">
                {formatCurrencyVND(flightItemData.ticketdetail.farePrice)}
              </span>
            </div>
          </div>
        </div>
        <FlightItemActions
          data={flightItemData}
          onSelectFlight={onSelectFlight}
          direction={direction}
          tid={tid}
          airlines={airlines}
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
