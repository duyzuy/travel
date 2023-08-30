"use client";

import { IMealOption } from "@/Models/flight/meal";
import { FLIGHT_DIRECTION } from "@/constants/enum";
import Image from "next/image";
import Quantity, { QUANTITY_ACTION } from "@/components/base/Quantity";
import classNames from "classnames";
import { moneyFormatVND } from "@/utils/helper";
import { IFlightBookingInformation } from "@/modules/bookingTicket/bookingInformation.interface";
import PassengerBoxItem, {
  PASSENGER_STATUS,
} from "@/components/PassengerBoxList/PassengerBoxItem";
import { useState } from "react";
import { IMealSelectedItem } from "@/modules/bookingServices/bookingServices.interface";
interface IMealSegment {
  mealList: IMealOption[];
  direction: FLIGHT_DIRECTION;
  passengers: IFlightBookingInformation["passengerInformation"]["passengers"];
  note?: string;
  onSelectedMeal: ({
    item,
    quantity,
    passenger,
  }: {
    item: IMealOption;
    quantity: number;
    passenger: { index: number };
  }) => void;
  mealSelectedItems: IMealSelectedItem[];
}
const MealSegment = ({
  mealList,
  direction,
  passengers,
  onSelectedMeal,
  mealSelectedItems,
}: IMealSegment) => {
  const [paxIndex, setPaxIndex] = useState(0);

  const onChangeQuantity = (
    action: QUANTITY_ACTION,
    { quantity, item }: { quantity: number; item: IMealOption }
  ) => {
    const passenger = passengers[paxIndex];

    onSelectedMeal({
      passenger: { index: passenger.index },
      item: item,
      quantity,
    });
  };
  return (
    <>
      <div className="passengers px-6 py-4 bg-white sticky top-20 drop-shadow-md flex items-center">
        {passengers.map((pax, _index) => (
          <PassengerBoxItem
            key={pax.index}
            firstName={pax.firstName}
            lastName={pax.lastName}
            status={
              paxIndex === _index
                ? PASSENGER_STATUS.PROCESS
                : PASSENGER_STATUS.WAITING
            }
          />
        ))}
      </div>
      <div className="px-8 py-6">
        {mealList.map((mealItem, _index) => (
          <div
            key={mealItem.key}
            className={classNames({
              meal: true,
              "mt-4": _index !== 0,
              "border border-gray-100 p-4 rounded-sm bg-white shadow-sm": true,
            })}
          >
            <div className="meal-item flex items-center">
              <div className="flex flex-1">
                <Image
                  src={mealItem.ancillaryItem.image}
                  alt={mealItem.ancillaryItem.name}
                  width={200}
                  height={124}
                  className="rounded-sm"
                />
                <div className="box-content ml-8">
                  <h4 className="text-md">{mealItem.ancillaryItem.name}</h4>
                  <div className="py-2">
                    <p className="text-lg text-emerald-500 font-bold">
                      {moneyFormatVND(
                        mealItem.ancillaryCharges[0].currencyAmounts[0]
                          .baseAmount
                      )}
                    </p>
                  </div>
                  <Quantity
                    onChange={(action, value) =>
                      onChangeQuantity(action, {
                        quantity: value,
                        item: mealItem,
                      })
                    }
                    value={0}
                  />
                </div>
              </div>
              <div className="btn">
                <button className="add-on-fc cursor-pointer">
                  <span className="block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#33d399"
                      className="w-8 h-8"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default MealSegment;
