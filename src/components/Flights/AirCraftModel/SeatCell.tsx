"use client";

import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { ISeatOption } from "@/Models/seatMap";
import { moneyFormatVND } from "@/utils/helper";
import IconSeat from "@/components/Icons/IconSeat";
import { PassengerBookingInformationType } from "@/modules/bookingTicket/bookingInformation.interface";

interface ISeatCell {
  data: ISeatOption | null;
  onSelect?: (seat: ISeatOption) => void;
  seatSpacing?: "sm" | "md" | "lg";
  selectedInfo?: {
    item: ISeatOption;
    passenger: PassengerBookingInformationType;
  };
}
const SeatCell = ({
  data,
  seatSpacing = "sm",
  onSelect,
  selectedInfo,
}: ISeatCell) => {
  const [isHover, setHover] = useState(false);
  if (data === null) {
    return (
      <div
        className={classNames({
          "w-9 h-9 flex items-center justify-center invisible": true,
          "mx-1 my-2": seatSpacing === "sm",
          "mx-2 my-3": seatSpacing === "md",
          "m-3": seatSpacing === "lg",
        })}
      >
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

  const getSeatType = useCallback((data: ISeatOption) => {
    let seat = { seatName: "", seatType: "" };

    if (
      data.seatMapCell.seatQualifiers.emergencyExit &&
      !data.seatMapCell.seatQualifiers.disabled
    ) {
      seat = {
        seatName: "Ghế ngồi chân rộng",
        seatType: "wideSeat",
      };
    }
    if (
      data.seatMapCell.seatQualifiers.bulkheadFront &&
      !data.seatMapCell.seatQualifiers.disabled
    ) {
      seat = {
        seatName: "Ghế cao cấp",
        seatType: "hotSeat",
      };
    }

    if (
      !data.seatMapCell.seatQualifiers.limitedRecline &&
      !data.seatMapCell.seatQualifiers.emergencyExit &&
      !data.seatMapCell.seatQualifiers.bulkheadFront &&
      !data.seatMapCell.seatQualifiers.disabled
    ) {
      seat = {
        seatName: "Ghế tiêu chuẩn",
        seatType: "normalSeat",
      };
    }
    if (data.seatMapCell.seatQualifiers.limitedRecline) {
      seat = {
        seatName: "Ghế hàng phía trước",
        seatType: "frontSeat",
      };
    }
    return seat;
  }, []);
  return (
    <span
      className={classNames({
        "seat-option w-9 h-9 flex items-center justify-center text-xs cursor-pointer":
          true,
        "mx-1 my-2": seatSpacing === "sm",
        "mx-2 my-3": seatSpacing === "md",
        "m-3": seatSpacing === "lg",
      })}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect?.(data)}
    >
      {selectedInfo ? (
        <SeatCell.Selected
          passengerInfo={`${selectedInfo.passenger.firstName.charAt(
            0
          )}${selectedInfo.passenger.lastName.charAt(0)}`}
        />
      ) : (
        <span className="seat-option">
          <IconSeat
            width={36}
            height={36}
            fill={
              (getSeatType(data).seatType === "hotSeat" && "#FFE7E7") ||
              (getSeatType(data).seatType === "wideSeat" && "#E5F3FF") ||
              (getSeatType(data).seatType === "frontSeat" && "#E3CCFA") ||
              (getSeatType(data).seatType === "normalSeat" && "#D6FFF0") ||
              (getSeatType(data).seatType === "unAvailable" && "#ECECEC") ||
              (getSeatType(data).seatType === "selectings" && "#FFF2DA") ||
              ""
            }
            fillLine={
              (getSeatType(data).seatType === "hotSeat" && "#DA0000") ||
              (getSeatType(data).seatType === "wideSeat" && "#0071DA") ||
              (getSeatType(data).seatType === "frontSeat" && "#7700D4") ||
              (getSeatType(data).seatType === "normalSeat" && "#1DB47D") ||
              (getSeatType(data).seatType === "unAvailable" && "#484848") ||
              (getSeatType(data).seatType === "selectings" && "#FF8A00") ||
              ""
            }
          />
        </span>
      )}
      {isHover ? (
        <SeatCell.Tooltip
          row={data.seatMapCell.rowIdentifier}
          seat={data.seatMapCell.seatIdentifier}
          price={moneyFormatVND(
            data.seatCharges[0].currencyAmounts[0].baseAmount
          )}
          seatName={getSeatType(data).seatName}
        />
      ) : null}
      <span
        className={classNames({
          "seat invisible hidden": true,
        })}
        data-row={data.seatMapCell.rowIdentifier}
        data-seat={data.seatMapCell.seatIdentifier}
      >
        <span className="row-identifier">{data.seatMapCell.rowIdentifier}</span>
        <span className="seat-identifier">
          {data.seatMapCell.seatIdentifier}
        </span>
      </span>
    </span>
  );
};
export default memo(SeatCell);

interface ISeatTooltip {
  seatName: string;
  row: string;
  seat: string;
  price: string;
}
SeatCell.Tooltip = function SeatCellToolTip({
  seatName,
  row,
  seat,
  price,
}: ISeatTooltip) {
  return (
    <div className="seat-info bg-white absolute -top-20 px-3 py-3 w-48 drop-shadow-sm z-10 rounded-md flex items-center border-gray-100 border-b-2 border pointer-events-none">
      <div className="flex items-center justify-center rounded-lg mr-2">
        <span className="seat-value text-2xl font-extrabold rounded flex items-center justify-center">
          <span className="text-emerald-500">
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
        className="caret absolute bottom-0 border-t-gray-200 border-r-transparent border-b-transparent border-l-transparent"
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

interface ISeatCellSelected {
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  passengerInfo?: string;
}
SeatCell.Selected = function SeatCellSelected({
  onClick,
  onMouseOver,
  onMouseLeave,
  passengerInfo = "",
}: ISeatCellSelected) {
  return (
    <span
      className={classNames({
        "seat-option w-9 h-9 flex items-center justify-center rounded-full text-xs drop-shadow-md relative cursor-pointer bg-emerald-200 border-2 border-emerald-400 ":
          true,
      })}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <span className=" font-bold uppercase">{passengerInfo}</span>
    </span>
  );
};
