"use client";

import React, { memo } from "react";
import Button from "../base/Button";
import classNames from "classnames";
import styles from "./navigation-addon.module.scss";
const NavigationBarAddOn: React.FC<{
  addOn?: "meal" | "luggage" | "seats";
  buttonText?: string;
  onNavigationBarSubmit?: () => void;
  subTotal?: string;
  subText?: string;
  className?: string;
}> = ({
  addOn = "meal",
  buttonText = "Xác nhận",
  onNavigationBarSubmit,
  subText = "Tổng tiền",
  subTotal = "0 VND",
  className = "",
}) => {
  return (
    <div
      className={classNames({
        [styles.wrapper]: styles.wrapper,
        [addOn]: addOn,
        "z-10bg-white": true,
        [className]: className,
      })}
    >
      <div className="px-6 py-4">
        <div className="flex justify-between">
          <div className="sub-total">
            <p className="text-sm">{subText}</p>
            <p className="text-emerald-500 font-bold text-lg">{subTotal}</p>
          </div>
          <Button
            className="w-40 shadow-md"
            color="secondary"
            onClick={onNavigationBarSubmit}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default memo(NavigationBarAddOn);
