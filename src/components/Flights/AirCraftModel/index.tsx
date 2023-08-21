"use client";

import React, { Fragment, memo } from "react";

import AirCraftHead from "@/components/Flights/AirCraftModel/AirCraftHead";
import AirCraftBottom from "@/components/Flights/AirCraftModel/AirCraftBottom";
import AirCraftWings from "@/components/Flights/AirCraftWings";
import AirCraftDoor from "./AirCraftDoor";
import classNames from "classnames";
import SeatCell from "./SeatCell";
import { SeatOptionType } from "@/Models/seatMap";
const AirCraftModel: React.FC<{
  modelName?: string;
  rowsHead?: string[];
  rowsEmergency?: number[];
  rowsSpacing?: number[];
  rowsWings?: number;
  children?: React.ReactNode;
  rowsSeats?: { rowNumber: number; rowSeats: (SeatOptionType | null)[] }[];
  onSelectSeat?: (data: SeatOptionType) => void;
  className?: string;
}> = ({
  rowsSpacing,
  rowsWings,
  modelName = "unKnown",
  rowsHead = ["A", "B", "C", "D", "E", "F"],
  rowsEmergency,
  rowsSeats,
  onSelectSeat,
  className = "",
}) => {
  return (
    <div
      className={classNames({
        aircraft: true,
        modelName: modelName,
        [className]: className,
      })}
    >
      <div className="aircraft-inner w-fit relative mx-auto">
        <AirCraftHead />
        <div className="aircraft-body w-fit border-l-4 border-r-4 px-4 pb-10 relative border-gray-300 bg-white">
          <div className="row-seat-name flex item-center">
            {rowsHead?.map((rowName, index) => (
              <Fragment key={`row-name${index}`}>
                {((index === 3 || index === 6) && (
                  <div className="space w-9 h-9"></div>
                )) || <></>}

                <div className="w-9 h-9 m-1 flex items-center justify-center">
                  <span className="text-sm text-gray-500 font-bold">
                    {rowName}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>

          {rowsSeats?.map((row, indexRow) => (
            <Fragment key={`row-${indexRow}`}>
              <div className="seat-row relative">
                <div className="seats flex items-center">
                  {row.rowSeats.map((seatOption, indx) => (
                    <Fragment
                      key={
                        (seatOption !== null && seatOption.selectionKey) ||
                        `seat-null-${indexRow}-${indx}`
                      }
                    >
                      {(indx === 3 || indx === 6) && (
                        <div className="number w-9 h-9 flex items-center justify-center ">
                          <span className="text-sm text-gray-400">
                            {seatOption?.seatMapCell.rowIdentifier}
                          </span>
                        </div>
                      )}
                      <SeatCell data={seatOption} onSelectSeat={onSelectSeat} />
                    </Fragment>
                  ))}
                </div>

                {(rowsWings && row.rowNumber === rowsWings && (
                  <AirCraftWings />
                )) || <></>}

                {(rowsEmergency && rowsEmergency.includes(row.rowNumber) && (
                  <AirCraftDoor className="absolute -left-6 -right-6 pointer-events-none bottom-3" />
                )) || <></>}

                {(rowsSpacing && rowsSpacing.includes(row.rowNumber) && (
                  <div className="space h-16"></div>
                )) || <></>}
              </div>
            </Fragment>
          ))}
        </div>
        <AirCraftBottom />
      </div>
    </div>
  );
};
export default memo(AirCraftModel);
