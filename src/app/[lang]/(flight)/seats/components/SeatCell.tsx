"use client";

import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { SeatOptionType } from "@/Models/seatMap";
import { formatCurrencyVND } from "@/utils/helper";
const SeatCell: React.FC<{
  data: SeatOptionType | null;
  onSelectSeat?: (seat: SeatOptionType) => void;
  seatSpacing?: "sm" | "md" | "lg";
}> = ({ data, seatSpacing, onSelectSeat }) => {
  const [isHover, setHover] = useState(false);
  if (data === null) {
    return (
      <div className="w-9 h-9 m-1 flex items-center justify-center invisible">
        <span className="text-sm null">&nbsp;</span>
      </div>
    );
  }

  const handleMouseOver = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  const getSeatType = useCallback((data: SeatOptionType) => {
    let seatName = "";

    if (
      data.seatMapCell.seatQualifiers.emergencyExit &&
      !data.seatMapCell.seatQualifiers.disabled
    ) {
      seatName = "Ghế ngồi chân rộng";
    }
    if (
      data.seatMapCell.seatQualifiers.bulkheadFront &&
      !data.seatMapCell.seatQualifiers.disabled
    ) {
      seatName = "Ghế cao cấp";
    }

    if (
      !data.seatMapCell.seatQualifiers.limitedRecline &&
      !data.seatMapCell.seatQualifiers.emergencyExit &&
      !data.seatMapCell.seatQualifiers.bulkheadFront &&
      !data.seatMapCell.seatQualifiers.disabled
    ) {
      seatName = "Ghế tiêu chuẩn";
    }
    if (data.seatMapCell.seatQualifiers.limitedRecline) {
      seatName = "Ghế hàng phía trước";
    }
    return seatName;
  }, []);
  return (
    <div
      className={classNames({
        "seat-option w-9 h-9 m-1 flex items-center justify-center rounded-md text-xs text-white shadow-sm relative cursor-pointer":
          true,
        "wide-seat bg-blue-500 border-b-2 border-blue-600":
          data.seatMapCell.seatQualifiers.emergencyExit &&
          !data.seatMapCell.seatQualifiers.disabled,
        "seat--hot bg-red-500 border-b-2 border-red-600":
          data.seatMapCell.seatQualifiers.bulkheadFront &&
          !data.seatMapCell.seatQualifiers.disabled,
        "seat--head-back":
          data.seatMapCell.seatQualifiers.bulkheadBack &&
          !data.seatMapCell.seatQualifiers.disabled,
        "front-seat bg-purple-500 border-b-2 border-purple-600":
          data.seatMapCell.seatQualifiers.limitedRecline,
        "normal-seat bg-emerald-500 border-b-2 border-emerald-600":
          !data.seatMapCell.seatQualifiers.limitedRecline &&
          !data.seatMapCell.seatQualifiers.emergencyExit &&
          !data.seatMapCell.seatQualifiers.bulkheadFront &&
          !data.seatMapCell.seatQualifiers.disabled,
        "un-available": !data.selectionValidity.available,
        // "disable bg-gray-300 border-b-4 border-gray-400":
        //   data.seatMapCell.seatQualifiers.disabled ||
        //   !data.selectionValidity.available,
      })}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        onSelectSeat && onSelectSeat(data);
      }}
    >
      {(isHover && (
        <SeatToolTip
          row={data.seatMapCell.rowIdentifier}
          seat={data.seatMapCell.seatIdentifier}
          price={formatCurrencyVND(
            data.seatCharges[0].currencyAmounts[0].baseAmount
          )}
          seatName={getSeatType(data)}
        />
      )) || <></>}

      <div
        className={classNames({
          "seat invisible": true,
        })}
        data-row={data.seatMapCell.rowIdentifier}
        data-seat={data.seatMapCell.seatIdentifier}
      >
        <span className="row-identifier">{data.seatMapCell.rowIdentifier}</span>
        <span className="seat-identifier">
          {data.seatMapCell.seatIdentifier}
        </span>
      </div>
    </div>
  );
};
export default memo(SeatCell);

const SeatToolTip: React.FC<{
  seatName: string;
  row: string;
  seat: string;
  price: string;
}> = ({ seatName, row, seat, price }) => {
  return (
    <div className="seat-info bg-emerald-500 absolute -top-20 px-3 py-2 w-48 shadow-2xl z-10 rounded-md flex items-center border-b-4 border-b-emerald-600 pointer-events-none">
      <div className="flex items-center justify-center  rounded-lg mr-2">
        <span className="seat-value text-2xl font-extrabold rounded flex items-center justify-center">
          <span>
            <span className="row-identifier">{row}</span>
            <span className="seat-identifier">{seat}</span>
          </span>
        </span>
      </div>
      <div className="seat-name text-sm">
        <span className="seat-name block">{seatName}</span>
        <span className="seat-price block font-bold">{price}</span>
      </div>
      <span
        className="caret absolute bottom-0 border-t-emerald-600 border-r-transparent border-b-transparent border-l-transparent"
        style={{
          borderStyle: "solid",
          borderWidth: 10,
          bottom: -20,
          left: "calc(50% - 10px)",
        }}
      ></span>
    </div>
  );
};
