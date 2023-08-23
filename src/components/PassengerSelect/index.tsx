"use client";
import React, { memo, useMemo, useRef, useState } from "react";
import PassengerDropdown from "./PassengerDropdown";
import Input from "@/components/base/Input";
import classNames from "classnames";
import { useClickOutSide } from "@/hooks/useClickOutSide";
import { PAX_TYPE } from "@/constants/enum";
import { IconUserGroup } from "@/components/Icons";

interface Props {
  variant?: "field" | "text";
  onSelectPassenger: (
    paxType: PAX_TYPE,
    { action, value }: { action: "minus" | "plus"; value: number }
  ) => void;
  adultAmount: number;
  childrenAmount: number;
  infantAmount: number;
}

const PassengerSelect: React.FC<Props> = ({
  variant = "field",
  onSelectPassenger,
  infantAmount,
  childrenAmount,
  adultAmount,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useClickOutSide(dropdownRef, () => setShowDropdown(false));

  const renderPassengerLabel = useMemo(() => {
    let output = `${adultAmount} người lớn`;

    if (childrenAmount > 0) {
      output = output.concat(", ", `${childrenAmount} trẻ em`);
    }

    if (infantAmount > 0) {
      output = output.concat(", ", `${infantAmount} em bé`);
    }
    return output;
  }, [adultAmount, infantAmount, childrenAmount]);

  return (
    <div
      className="relative input-passengers"
      onClick={() => setShowDropdown(true)}
    >
      {(variant === "field" && (
        <Input
          icon={IconUserGroup}
          name="passengers"
          placeholder="Hành khách"
          value={renderPassengerLabel}
          label="Hành khách"
          readOnly
        />
      )) || (
        <div className="passengers relative cursor-pointer flex items-center pr-6 pl-3 py-2">
          <div className="flex items-center">
            <span className="icon mr-3 w-5 h-5">
              <IconUserGroup />
            </span>
            <div className="text">
              <p>{renderPassengerLabel}</p>
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
      )}
      {showDropdown ? (
        <div ref={dropdownRef} className="booking-passengers-dropdown">
          <PassengerDropdown
            onChangeQuantity={onSelectPassenger}
            adultAmount={adultAmount}
            childrenAmount={childrenAmount}
            infantAmount={infantAmount}
          />
        </div>
      ) : null}
    </div>
  );
};
export default memo(PassengerSelect);
