"use client";
import React, { Children, memo } from "react";
import classNames from "classnames";
type PropsType = {
  children?: React.ReactNode;
  className?: string;
  onclick?: () => void;
  type?: "button" | "submit";
  fullWidth?: boolean;
};
const Button: React.FC<PropsType> = ({
  type = "button",
  children,
  fullWidth = false,
}) => {
  return (
    <button
      type={type}
      className={classNames({
        "button px-4 py-3 inline-flex items-center justify-center bg-primary-default text-white rounded-sm text-center":
          true,
        "w-full": fullWidth,
      })}
    >
      {children}
    </button>
  );
};
export default memo(Button);
