"use client";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import PassengerDropdown from "../PassengerDropdown";
import Input from "@/components/Input";
import classNames from "classnames";
import { useClickOutSide } from "@/hooks/useClickOutSide";
import { useBookingFormFlight } from "@/hooks/useBookingFormFlight";
import { bookingFormFlightVar } from "@/cache/vars";
import { PaxType } from "@/constants/enum";
import { useReactiveVar } from "@apollo/client";
import { IconUserGroup } from "@/components/Icons";
const InputPassenger: React.FC<{
  variant?: "field" | "text";
}> = ({ variant = "field" }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useClickOutSide(dropdownRef, () => setShowDropdown(false));
  const {
    operations: { onUpdateAmountPassengers },
  } = useBookingFormFlight(bookingFormFlightVar);

  const { passengers } = useReactiveVar(bookingFormFlightVar);

  const passengerValue = useMemo(() => {
    let output = `${passengers[PaxType.ADULT].amount} người lớn`;

    if (passengers[PaxType.CHILDREN].amount > 0) {
      output = output.concat(
        ", ",
        `${passengers[PaxType.CHILDREN].amount} trẻ em`
      );
    }

    if (passengers[PaxType.INFANT].amount > 0) {
      output = output.concat(
        ", ",
        `${passengers[PaxType.INFANT].amount} em bé`
      );
    }
    return output;
  }, [passengers]);

  const onUpdatePassengersAmount = useCallback(
    (
      paxType: PaxType,
      { action, value }: { action: "minus" | "plus"; value: number }
    ) => {
      onUpdateAmountPassengers(paxType, { action, value });
    },
    []
  );

  return (
    <>
      <div
        className="relative input-passengers"
        onClick={() => setShowDropdown(true)}
      >
        {(variant === "field" && (
          <Input
            icon={IconUserGroup}
            name="passengers"
            placeholder="Hành khách"
            value={passengerValue}
            label="Hành khách"
            readOnly
          />
        )) || (
          <>
            <div className="passengers relative cursor-pointer flex items-center pr-6 pl-3 py-2">
              <div className="flex items-center">
                <span className="icon mr-3 w-5 h-5">
                  <IconUserGroup />
                </span>
                <div className="text">
                  <p>{passengerValue}</p>
                </div>
              </div>
              <span
                className={classNames({
                  "arrow-down absolute right-1": true,
                  "rotate-180": showDropdown,
                })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>
          </>
        )}
        {(showDropdown && (
          <div ref={dropdownRef} className="booking-passengers-dropdown">
            <PassengerDropdown
              onChangeQuantity={onUpdatePassengersAmount}
              adultAmount={passengers[PaxType.ADULT].amount}
              childrenAmount={passengers[PaxType.CHILDREN].amount}
              infantAmount={passengers[PaxType.INFANT].amount}
            />
          </div>
        )) || <></>}
      </div>
    </>
  );
};
export default memo(InputPassenger);
