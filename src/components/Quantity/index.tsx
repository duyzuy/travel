"use client";
import React, { memo, useCallback, useMemo, useState } from "react";
import styles from "./quantity.module.scss";
type PropsType = {
  className?: string;
  onChange?: ({
    action,
    value,
  }: {
    action: "minus" | "plus";
    value: number;
  }) => void;
  value?: number;
  minValue?: number;
  maxValue?: number;
};
const Quantity: React.FC<PropsType> = ({
  className,
  onChange,
  value = 0,
  minValue = 0,
  maxValue = 999,
}) => {
  const [quantity, setQuantity] = useState(value);
  console.log("render quantity");
  const clx = useMemo(() => {
    let cls = "";
    if (className) {
      cls = cls.concat(" ", className);
    }
    return cls;
  }, [className]);

  const onChangeQuantity = useCallback((action: "minus" | "plus") => {
    if (onChange) {
      onChange({ action, value: value });
    } else {
      let newQuantity = quantity;

      switch (action) {
        case "minus": {
          if (quantity > minValue) {
            newQuantity = quantity - 1;
          }

          break;
        }
        case "plus": {
          if (quantity < maxValue) {
            newQuantity = quantity + 1;
          }
          break;
        }
      }
      setQuantity(newQuantity);
    }
  }, []);

  return (
    <>
      <div className={`${styles.wrapper} ${clx} quantity flex items-center`}>
        <span
          onClick={() => onChangeQuantity("minus")}
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
          onClick={() => onChangeQuantity("plus")}
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
    </>
  );
};
export default memo(Quantity);
