"use client";

import classNames from "classnames";
import React, { memo, useEffect, useState } from "react";
import useAnimation from "@/hooks/useAnimation";
import IconSeat from "@/components/Icons/IconSeat";
const AirCraftSeatNotes: React.FC<{
  isSticky?: boolean;
  type?: "vertical" | "horizon";
  className?: string;
}> = ({ isSticky = false, type = "horizon", className = "" }) => {
  const SEAT_TYPES = [
    {
      id: "seat-1",
      name: "Ghế cao cấp",
      price: "90,000 VND",
      type: "hotSeat",
    },
    {
      id: "seat-2",
      name: "Ghế hàng phía trước",
      price: "80,000 VND",
      type: "frontSeat",
    },
    {
      id: "seat-3",
      name: "Ghế để chân rộng",
      price: "60,000 VND",
      type: "wideSeat",
    },
    {
      id: "seat-4",
      name: "Ghế ngồi tiêu chuẩn",
      price: "40,000 VND",
      type: "normalSeat",
    },
    {
      id: "seat-5",
      name: "Đã có người",
      price: "",
      type: "unAvailable",
    },
    // {
    //   id: "seat-6",
    //   name: "Các ghế đang chọn",
    //   price: "",
    //   type: "selectings",
    // },
  ];
  return (
    <div
      className={classNames({
        "seat-note relative": true,
        [className]: className,
      })}
    >
      <div className="seat-note-inner bg-white shadow-sm border">
        <div
          className={classNames({
            "px-3 lg:px-6 transition-all": true,
            "opacity-0 h-0 pointer-events-none pt-0": isSticky,
            "opacity-1 pt-3 h-16": !isSticky,
          })}
        >
          <p className="font-black py-2">Chú thích ghế</p>
          <div className="border-b my-2"></div>
        </div>

        <ul
          className={classNames({
            "px-2 relative z-10": true,
            "flex flex-wrap": type === "horizon",
          })}
        >
          {SEAT_TYPES.map((seat) => (
            <li
              key={seat.id}
              className={classNames({
                "flex items-center px-2 py-1 lg:px-4 lg:py-3": true,
                "w-1/3 lg:w-1/5": type === "horizon",
                "w-full": type === "vertical",
              })}
            >
              <span className="w-6 h-6 block mr-2">
                <IconSeat
                  width={22}
                  height={26}
                  fill={
                    (seat.type === "hotSeat" && "#FFE7E7") ||
                    (seat.type === "wideSeat" && "#E5F3FF") ||
                    (seat.type === "frontSeat" && "#E3CCFA") ||
                    (seat.type === "normalSeat" && "#D6FFF0") ||
                    (seat.type === "unAvailable" && "#ECECEC") ||
                    (seat.type === "selectings" && "#FFF2DA") ||
                    ""
                  }
                  fillLine={
                    (seat.type === "hotSeat" && "#DA0000") ||
                    (seat.type === "wideSeat" && "#0071DA") ||
                    (seat.type === "frontSeat" && "#7700D4") ||
                    (seat.type === "normalSeat" && "#1DB47D") ||
                    (seat.type === "unAvailable" && "#484848") ||
                    (seat.type === "selectings" && "#FF8A00") ||
                    ""
                  }
                />
              </span>
              <p className="text-sm flex-1">
                <span className="block text-gray-600 text-xs">{seat.name}</span>
                {(seat.price && (
                  <span className="block font-bold">{seat.price}</span>
                )) ||
                  null}
              </p>
            </li>
          ))}
        </ul>

        <div
          className={classNames({
            "bottom-note px-6 pb-4": true,
            "opacity-0 hidden": isSticky,
            "opacity-1": !isSticky,
          })}
        >
          <div className="border-b mb-3"></div>
          <p className="text-sm text-gray-700 py-2">Tàu bay: Airbus A330</p>
        </div>
      </div>
    </div>
  );
};
export default memo(AirCraftSeatNotes);
