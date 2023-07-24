"use client";
import React, { memo, useMemo } from "react";
import classNames from "classnames";

type PropsType = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  fullWidth?: boolean;
  variant?: "outline" | "contained";
  color?: "primary" | "secondary" | "orange";
  isLoading?: boolean;
  isDisable?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
  size?: "xs" | "md" | "lg";
};

const Button: React.FC<PropsType> = ({
  type = "button",
  children,
  fullWidth = false,
  variant = "contained",
  color = "primary",
  isLoading = false,
  isDisable = false,
  onClick,
  size = "md",
  rounded = "md",
  className,
}) => {
  const clx = useMemo(() => {
    let cls = "";
    if (className) {
      cls = cls.concat(" ", className);
    }
    return cls;
  }, [className]);
  return (
    <button
      type={type}
      className={
        classNames({
          "button transition inline-flex items-center justify-center text-center ":
            true,
          "bg-sky-500 hover:bg-sky-600 text-white border border-sky-500 hover:border-sky-600":
            variant === "contained" && color === "primary",
          "bg-emerald-500 hover:bg-emerald-600 text-white border border-emerald-500 hover:border-emerald-600":
            variant === "contained" && color === "secondary",
          "border-sky-500 border text-sky-600":
            variant === "outline" && color === "primary",
          "border-emerald-500 border text-emerald-600":
            variant === "outline" && color === "secondary",
          "rounded-sm": rounded === "sm",
          "rounded-md": rounded === "md",
          "rounded-lg": rounded === "lg",
          "rounded-xl": rounded === "xl",
          "rounded-full": rounded === "full",
          "w-full": fullWidth,
          "px-4 py-3": size === "lg",
          "px-3 py-2": size === "md",
          "px-2 py-1": size === "xs",
        }) +
        " " +
        clx
      }
      onClick={() => {
        if (isDisable) return;
        return onClick && onClick;
      }}
    >
      {(isLoading && (
        <>
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#ffffff7a"
              strokeWidth="2"
              fill="transparent"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={30}
              className="absolute"
            />
          </svg>
          Loading...
        </>
      )) ||
        children}
    </button>
  );
};
export default memo(Button);
