"use client";
import React, { memo, useEffect, useRef, useState } from "react";
import PassengerDropdown from "../PassengerDropdown";
import Input from "@/components/Input";
import { UserIcon, PeoplesIcon } from "@/assets/icons";
import Image from "next/image";
import classNames from "classnames";
import { useClickOutSide } from "@/hooks/useClickOutSide";
const InputPassenger: React.FC<{ variant?: "field" | "text" }> = ({
  variant = "field",
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useClickOutSide(dropdownRef, () => setShowDropdown(false));
  return (
    <>
      <div
        className="relative input-passengers"
        onClick={() => setShowDropdown(true)}
      >
        {(variant === "field" && (
          <Input
            iconPath={UserIcon}
            name="passengers"
            placeholder="Hành khách"
            value="1 người lớn, 1 trẻ em, 1 em bé"
            label="Hành khách"
            readOnly
          />
        )) || (
          <>
            <div className="passengers relative flex items-center pr-8 pl-3 py-2">
              <div className="flex items-center cursor-pointer">
                <span className="icon mr-3 w-5 h-5">
                  <Image src={UserIcon} alt="user icon" />
                </span>
                <div className="text">
                  <p>1 người lớn, 1 trẻ em, 1 em bé</p>
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
            <PassengerDropdown />
          </div>
        )) || <></>}
      </div>
    </>
  );
};
export default memo(InputPassenger);
