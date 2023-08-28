"use client";

import React, { memo, useCallback, useMemo } from "react";
import LuggageItem from "@/components/LuggageItem";
import { moneyFormatVND } from "@/utils/helper";
import {
  ILuggageOption,
  ILuggageSelectedItem,
} from "@/modules/bookingServices/bookingServices.interface";
import { IFlightBookingInformation } from "@/modules/bookingTicket/bookingInformation.interface";
import { FLIGHT_DIRECTION } from "@/constants/enum";
interface ILugggagesSegment {
  label: string;
  departure: string;
  departureCode: string;
  arrivalCode: string;
  arrival: string;
  direction: FLIGHT_DIRECTION;
  items: ILuggageOption[];
  passengers: IFlightBookingInformation["passengerInformation"]["passengers"];
  selectedItems: ILuggageSelectedItem[];
  onSelectItem: (item: ILuggageOption, passengerIndex: number) => void;
}

const LuggageSegment = (props: ILugggagesSegment) => {
  const {
    items,
    label,
    departure,
    arrival,
    direction,
    passengers,
    arrivalCode,
    departureCode,
    selectedItems,
    onSelectItem,
  } = props;

  const isSelectedItem = useCallback(
    (itemId: string, paxIndex: number) => {
      return Boolean(
        selectedItems.find(
          (item) => item.item.id === itemId && item.passenger.index === paxIndex
        )
      );
    },
    [selectedItems]
  );
  return (
    <div className="luggages-add-in bg-white">
      <div className="luggage-sector-addon mb-6">
        <div className="sector-label py-4 mb-2 px-6">
          <span className=" rounded-sm inline-block text-sm shadow-sm">
            {label}
          </span>
          <p className="flex items-center font-bold">
            <span>
              {departure} - {departureCode}
            </span>
            <span className="mx-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                ></path>
              </svg>
            </span>
            <span>
              {arrival} - {arrivalCode}
            </span>
          </p>
        </div>
        <div className="note px-4">
          <div className="luggage-note px-4 py-2 bg-sky-50 rounded-sm mb-6">
            <p className="text-sky-600">
              Hạng vé đã bao gồm 7kg hành lý xách tay và 10kg hành lý ký gửi
            </p>
          </div>
        </div>
        {passengers.map((passenger, _pIndex) => (
          <div
            className="pax-luggage-add-ons px-6"
            key={`passenger-${_pIndex}`}
          >
            <div className="pax-luggage-item">
              <div className="pax-full-name py-2">
                <p className="flex items-center uppercase text-sm">
                  {`${passenger.firstName}, ${passenger.lastName}`}
                </p>
              </div>
              <div className="luggage-packages flex items-center flex-wrap flex-1">
                {items.map((item, _index) => (
                  <LuggageItem
                    key={`passenger-${_pIndex}-${item.id}`}
                    price={moneyFormatVND(item.baseAmount)}
                    name={item.name}
                    isSelected={isSelectedItem(item.id, passenger.index)}
                    onClick={() => onSelectItem(item, passenger.index)}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default memo(LuggageSegment);
