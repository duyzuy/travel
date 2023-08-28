"use client";

import React, { useState } from "react";
import { PassengerBookingInformationType } from "@/modules/bookingTicket/bookingInformation.interface";
import {
  FLIGHT_SERVICES,
  ISeatSeledtedItem,
} from "@/modules/bookingServices/bookingServices.interface";
import { ISeatOption } from "@/Models/seatMap";
import AirCraftSeatNotes from "@/components/Flights/AirCraftModel/AirCraftSeatNotes";

import PassengerBoxItem, {
  PASSENGER_STATUS,
} from "@/components/PassengerBoxList/PassengerBoxItem";
import classNames from "classnames";
import { FLIGHT_DIRECTION } from "@/constants/enum";

import SeatMapA320 from "../SeatMapA320";
import SeatMapA330 from "../SeatMapA330";
interface ISeatSegment {
  passengers: PassengerBookingInformationType[];
  onSelectSeat: (
    passenger: PassengerBookingInformationType,
    seatOpt: ISeatOption
  ) => void;
  flightDirection: FLIGHT_DIRECTION;
  selectedSeatItems: ISeatSeledtedItem[];
  airCraftModel: "A330" | "A320";
}
const SeatSegment = ({
  passengers,
  onSelectSeat,
  flightDirection,
  selectedSeatItems,
  airCraftModel,
}: ISeatSegment) => {
  const [passengerIndex, setPassengerIndex] = useState(0);

  const onSelectPassengerSeat = (seatOpt: ISeatOption) => {
    const passenger = passengers[passengerIndex];
    onSelectSeat(passenger, seatOpt);
  };

  const passengerGetItemSelect = (
    passenger: PassengerBookingInformationType,
    itemList: ISeatSeledtedItem[]
  ) => {
    const service = itemList.find(
      (seatItem) => seatItem.passenger.index === passenger.index
    );
    if (service) {
      return `${service.item.seatMapCell.rowIdentifier}-${service.item.seatMapCell.seatIdentifier}`;
    }
  };
  const getSelectedItemSeat = (
    selectedItems: ISeatSeledtedItem[],
    passengers: PassengerBookingInformationType[]
  ) => {
    return selectedItems.reduce(
      (
        sum: {
          item: ISeatOption;
          passenger: PassengerBookingInformationType;
        }[],
        item
      ) => {
        const passenger = passengers.find(
          (passenger) => passenger.index === item.passenger.index
        );
        if (passenger) {
          sum = [...sum, { item: item.item, passenger: passenger }];
        }
        return sum;
      },
      []
    );
  };
  return (
    <div
      className="seat-container"
      style={{
        height: "calc(100vh - 160px)",
      }}
    >
      <div className="sticky top-20 bg-white z-20 border-b">
        <div className="px-4 pt-4 w-full bg-white relative z-10">
          <ul
            className={classNames({
              "pax-list text-sm flex items-center overflow-x-auto pb-4": true,
            })}
          >
            {passengers.map((passenger, _index) => (
              <PassengerBoxItem
                key={`${passenger.firstName}-${passenger.lastName}`}
                firstName={passenger.firstName}
                lastName={passenger.lastName}
                serviceType={FLIGHT_SERVICES.SEATS}
                status={
                  (_index === passengerIndex && PASSENGER_STATUS.PROCESS) ||
                  (passengerGetItemSelect(passenger, selectedSeatItems) &&
                    PASSENGER_STATUS.SELECTED) ||
                  PASSENGER_STATUS.WAITING
                }
                selectedItem={passengerGetItemSelect(
                  passenger,
                  selectedSeatItems
                )}
                onSelect={() => setPassengerIndex(_index)}
              />
            ))}
          </ul>
        </div>
      </div>
      <div
        className="seatmap overflow-x-hidden"
        style={{
          height: "calc(100% - 97px)",
        }}
      >
        <div className="">
          <div className="note z-10 relative p-4 bg-white drop-shadow-md">
            <AirCraftSeatNotes
              isSticky
              isFull={false}
              spacing="sm"
              className="border"
            />
          </div>
          {airCraftModel === "A330" ? (
            <SeatMapA330
              onSelect={onSelectPassengerSeat}
              selectedItems={getSelectedItemSeat(
                selectedSeatItems || [],
                passengers
              )}
              className="-mt-40"
            />
          ) : null}

          {airCraftModel === "A320" ? (
            <SeatMapA320
              onSelect={onSelectPassengerSeat}
              selectedItems={getSelectedItemSeat(
                selectedSeatItems || [],
                passengers
              )}
              className="-mt-40"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default SeatSegment;
