"use client";

import React, { memo, useRef, useState, useId } from "react";
import classNames from "classnames";
import { useClickOutSide } from "@/hooks/useClickOutSide";

const Selection: React.FC<{
  options?: { id: string | number; value: string; name: string }[];
  name?: string;
  className?: string;
  value?: { id: string | number; value: string; name: string };
  onSelect?: (opt: {
    id: string | number;
    value: string;
    name: string;
  }) => void;
  label?: string;
  size?: "sm" | "md" | "lg";
  textSize?: "sm" | "md" | "lg";
  required?: boolean;
}> = ({
  className = "",
  name = "",
  options = [],
  onSelect,
  value,
  label,
  size = "md",
  textSize = "sm",
  required,
}) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isShowDropdown, setShowDropdown] = useState(false);
  const selectId = useId();
  options = [
    { id: 1, name: "Ông", value: "Mr" },
    { id: 2, name: "Bà", value: "Mrs" },
    { id: 3, name: "Cô", value: "Ms" },
  ];

  useClickOutSide(selectRef, () => setShowDropdown(false));
  return (
    <div className={`custom-selection relative ${className}`}>
      <div
        className="selection"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <label htmlFor={`${selectId}-${name}`} className="mb-2 block">
          {label}
          {(required && <span className="text-red-400 ml-1">*</span>) || <></>}
        </label>
        {value && (
          <div
            className={classNames({
              "select-input flex items-center rounded-sm justify-between cursor-pointer":
                true,
              "border border-emerald-500": isShowDropdown,
              "border border-gray-300": !isShowDropdown,
              "px-4 py-3": size === "lg",
              "px-3 py-2": size === "md",
              "text-sm": textSize === "sm",
            })}
          >
            {value.name}
            <span
              className={classNames({
                icon: true,
                "rotate-180": isShowDropdown,
              })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
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
        <input
          id={`${selectId}-${name}`}
          name={name}
          value={value?.value}
          type="hidden"
          readOnly
        />
      </div>
      {(isShowDropdown && (
        <div
          className="selection-dropdown absolute bg-white left-0 right-0 shadow-md rounded-sm border-gray-100 border z-10"
          ref={selectRef}
        >
          {options &&
            options.map((opt) => (
              <div
                key={opt.id}
                className={classNames({
                  "option hover:bg-gray-50": true,
                  "bg-gray-50": value?.id === opt.id,
                  "cursor-pointer": value?.id !== opt.id,
                  "text-sm": textSize === "sm",
                  "px-4 py-3": size === "lg",
                  "px-3 py-2": size === "md",
                  "px-2 py-1": size === "sm",
                })}
                onClick={() => {
                  return onSelect && onSelect(opt);
                }}
              >
                {opt.name}
              </div>
            ))}
        </div>
      )) || <></>}
    </div>
  );
};
export default memo(Selection);
