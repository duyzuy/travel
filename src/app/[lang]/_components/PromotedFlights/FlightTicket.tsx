"use client";

import React, { memo, useCallback } from "react";
import Image from "next/image";
import { FlightTicketOption } from "@/Models/hotFlight";
import { moneyFormatVND } from "@/utils/helper";
import { AirCraftRightIcon } from "@/assets/icons";
import { VNABrandIcon, VJBrandOneIcon, BBBrandIcon } from "@/assets/icons";
const FlightTicket: React.FC<{
  data: FlightTicketOption;
  tripFrom: string;
  tripTo: string;
}> = ({ data, tripFrom, tripTo }) => {
  return (
    <div className="ticket-item rounded-md border border-gray-100 shadow-md w-full">
      <div className="inner-item p-3">
        <div className="brand mb-3">
          {
            <Image
              src={
                (data.flightCode.includes("VN") && VNABrandIcon) ||
                (data.flightCode.includes("VJ") && VJBrandOneIcon) ||
                BBBrandIcon
              }
              alt={
                (data.flightCode.includes("VN") && "Vietnam airline") ||
                (data.flightCode.includes("VJ") && "Vietjet") ||
                "Bamboo"
              }
              width={50}
              height={50}
              className="rounded-full p-1 border shadow-md border-gray-100"
            />
          }
        </div>
        <div className="destination items-center">
          <p className="flex items-center trip-destination">
            <span className="block trip-from">{tripFrom}</span>
            <span className="block w-4 h-4 mx-3">
              <Image src={AirCraftRightIcon} alt="icon" width={20} />
            </span>
            <span className="block trip-to">{tripTo}</span>
          </p>
          <p className="trip-date py-2 text-left">
            <span className="text-sm">Khởi hành lúc:</span>
            <span className="flex items-center">
              <span className="block text-sm mr-2">{data.departureTime}</span>
              <span className="block text-sm ">{data.departureDate}</span>
            </span>
          </p>
        </div>
        <div className="price flex items-center justify-end">
          <p className="font-bold text-emerald-600">
            {moneyFormatVND(data.totalPrice)}
          </p>
        </div>
      </div>
    </div>
  );
};
export default memo(FlightTicket);
