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
  color?: "primary" | "secondary" | "orange" | "custom" | "danger";
  isLoading?: boolean;
  isDisable?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
  size?: "sm" | "md" | "lg";
  shadow?: "sm" | "md" | "lg";
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
  className = "",
  shadow = "sm",
}) => {
  return (
    <button
      type={type}
      className={classNames({
        "button transition inline-flex items-center justify-center text-center ":
          true,
        "bg-sky-400 hover:bg-sky-500 text-white border border-sky-400 hover:border-sky-500":
          variant === "contained" && color === "primary" && !isLoading,
        "bg-emerald-400 hover:bg-emerald-500 text-white border border-emerald-400 hover:border-emerald-500":
          variant === "contained" && color === "secondary" && !isLoading,
        "border-sky-500 border text-sky-600":
          variant === "outline" && color === "primary",
        "border-emerald-400 border text-emerald-500 hover:bg-emerald-400 hover:text-white":
          variant === "outline" && color === "secondary",
        "border-red-400 border text-red-500 hover:bg-red-500 hover:text-white":
          variant === "outline" && color === "danger",
        "rounded-sm": rounded === "sm",
        "rounded-md": rounded === "md",
        "rounded-lg": rounded === "lg",
        "rounded-xl": rounded === "xl",
        "rounded-full": rounded === "full",
        "w-full": fullWidth,
        "px-4 py-3": size === "lg",
        "px-3 py-2": size === "md",
        "px-2 py-1": size === "sm",
        "bg-gray-200": isLoading,
        "shadow-sm": shadow === "sm",
        "shadow-md": shadow === "md",
        "shadow-lg": shadow === "lg",
        [className]: className,
      })}
      onClick={() => {
        if (isDisable || isLoading) return;
        return onClick && onClick();
      }}
    >
      {(isLoading && (
        <span className="flex items-center h-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce mr-1"></span>
          <span
            className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce mr-1"
            style={{ animationDelay: "100ms" }}
          ></span>
          <span
            className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
            style={{ animationDelay: "200ms" }}
          ></span>
        </span>
      )) ||
        children}
    </button>
  );
};
export default memo(Button);
