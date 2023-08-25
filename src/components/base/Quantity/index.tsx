"use client";
import React, { memo, useCallback, useMemo, useState } from "react";
import styles from "./quantity.module.scss";
import classNames from "classnames";

export enum QUANTITY_ACTION {
  MINUS = "minus",
  PLUS = "plus",
}
type PropsType = {
  className?: string;
  onChange?: (action: QUANTITY_ACTION, value: number) => void;
  value?: number;
  minValue?: number;
  maxValue?: number;
  size?: "xs" | "sm" | "md" | "lg";
};
const Quantity: React.FC<PropsType> = ({
  onChange,
  value = 0,
  minValue = 0,
  maxValue = 999,
  className = "",
}) => {
  const [quantity, setQuantity] = useState(value);

  const onChangeQuantity = (action: QUANTITY_ACTION) => {
    if (onChange) {
      const amount = action === QUANTITY_ACTION.MINUS ? value - 1 : value + 1;
      onChange(action, amount);
    } else {
      setQuantity((prev) => {
        return action === QUANTITY_ACTION.MINUS ? prev - 1 : prev + 1;
      });
    }
  };

  return (
    <div
      className={classNames({
        [styles.wrapper]: styles.wrapper,
        "quantity flex items-center": true,
        [className]: className,
      })}
    >
      <span
        onClick={() => onChangeQuantity(QUANTITY_ACTION.MINUS)}
        className="minus inline-flex w-8 h-8 items-center justify-center rounded-sm border shadow-sm border-solid border-gray-300 hover:border-emerald-600 hover:shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
        </svg>
      </span>
      <span className="amount px-3 inline-flex items-center justify-center w-12 h-8">
        {(onChange && value) || quantity}
      </span>
      <span
        onClick={() => onChangeQuantity(QUANTITY_ACTION.PLUS)}
        className="plus inline-flex w-8 h-8 items-center justify-center rounded-sm border border-solid border-gray-300 shadow-sm hover:border-emerald-600 hover:shadow-md"
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
            d="M12 6v12m6-6H6"
          />
        </svg>
      </span>
    </div>
  );
};
export default memo(Quantity);
