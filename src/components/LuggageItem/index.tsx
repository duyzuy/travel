"use client";
import React, { memo } from "react";
import classNames from "classnames";

import styles from "./luggage-item.module.scss";
const LuggageItem: React.FC<{
  isSelected: boolean;
  price: string;
  name: string;
  onSelectLuggage?: () => void;
}> = ({ price, name, isSelected, onSelectLuggage }) => {
  return (
    <div
      className={classNames({
        [styles.wrapper]: styles.wrapper,
        "luggage-item w-28 mb-4 mr-4": true,
      })}
    >
      <div
        className={classNames({
          "luggage-inner border px-4 py-3 rounded-md text-center bg-white shadow-sm cursor-pointer":
            true,
          "border-emerald-500 is-active": isSelected,
        })}
      >
        {isSelected ? (
          <span className="absolute top-1 right-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-emerald-500"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        ) : null}
        <div className="text-sm text-gray-500">{name}</div>
        <div className="text-sm">{price}</div>
      </div>
    </div>
  );
};
export default memo(LuggageItem);
