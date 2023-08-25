"use client";

import React, { memo, useRef, useState, useId, useMemo } from "react";
import classNames from "classnames";
import { useClickOutSide } from "@/hooks/useClickOutSide";

type OptionType = { id: string | number; value: string; name: string };
interface ISelect {
  options?: OptionType[];
  name?: string;
  className?: string;
  value?: OptionType;
  onSelect?: (opt: {
    id: string | number;
    value: string;
    name: string;
  }) => void;
  label?: string;
  size?: "sm" | "md" | "lg";
  textSize?: "sm" | "md" | "lg";
  required?: boolean;
}
const Selection = ({
  className = "",
  name = "",
  options = [],
  onSelect,
  value,
  label,
  size = "md",
  textSize = "sm",
  required,
}: ISelect) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isShowDropdown, setShowDropdown] = useState(false);
  const selectId = useId();

  useClickOutSide(selectRef, () => setShowDropdown(false));
  const onSelectOpt = (opt: OptionType) => {
    onSelect && onSelect(opt);
    setShowDropdown(false);
  };
  return (
    <div className={`custom-selection relative ${className}`}>
      <div
        className={classNames({
          "text-sm": textSize === "sm",
          "text-md": textSize === "md",
          "text-lg": textSize === "lg",
        })}
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <label htmlFor={`${selectId}-${name}`} className="mb-2 block">
          {label}
          {required ? <span className="text-red-400 ml-1">*</span> : null}
        </label>
        {value ? (
          <div
            className={classNames({
              "select-input flex items-center rounded-sm justify-between cursor-pointer":
                true,
              "border border-emerald-500": isShowDropdown,
              "border border-gray-300": !isShowDropdown,
              "px-4 py-3": size === "lg",
              "px-3 py-2": size === "md",
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
        ) : null}

        <input
          id={`${selectId}-${name}`}
          name={name}
          value={value?.name || ""}
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
              <Selection.Option
                key={opt.id}
                title={opt.name}
                onSelect={() => onSelectOpt(opt)}
                size={size}
                isSelected={value?.id === opt.id}
                textSize={textSize}
              />
            ))}
        </div>
      )) || <></>}
    </div>
  );
};
export default memo(Selection);

interface IOption {
  size?: "sm" | "md" | "lg";
  textSize?: "sm" | "md" | "lg";
  onSelect?: () => void;
  title: string;
  isSelected: boolean;
}

Selection.Option = function SelectOption({
  size = "md",
  textSize = "md",
  title,
  onSelect,
  isSelected,
}: IOption) {
  return (
    <div
      className={classNames({
        "option hover:bg-gray-50": true,
        "bg-gray-50": isSelected,
        "cursor-pointer": !isSelected,
        "text-sm": textSize === "sm",
        "text-lg": textSize === "lg",
        "text-md": textSize === "md",
        "px-4 py-3": size === "lg",
        "px-3 py-2": size === "md",
        "px-2 py-1": size === "sm",
      })}
      onClick={onSelect}
    >
      {title}
    </div>
  );
};
