"use client";
import React, { useId, memo, forwardRef, ForwardedRef } from "react";
import classNames from "classnames";
import styles from "./input.module.scss";

declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

interface Props {
  className?: string;
  type?: "text" | "password";
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  fullWidth?: boolean;
  required?: boolean;
  label?: string;
  error?: boolean;
  name?: string;
  errorMessage?: string;
  showLabel?: boolean;
  iconPath?: string;
  icon?: React.ElementType;
  floating?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  value?: string;
  onFocus?: () => void;
  textSize?: "sm" | "md" | "lg";
  [key: string]: any;
}
const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      className = "",
      type,
      placeholder,
      fullWidth = true,
      name,
      label = "Label",
      error,
      errorMessage,
      required = false,
      showLabel,
      iconPath,
      floating = true,
      readOnly = false,
      onChange,
      size = "md",
      onFocus,
      value = "",
      icon,
      textSize = "md",
      ...rest
    },
    ref
  ) => {
    const idEl = useId();

    const Icon = icon;
    return (
      <div
        className={classNames({
          [styles.controller]: styles.controller,
          [className]: className,
        })}
      >
        <div
          className={classNames({
            "floating-label": floating,
            "w-full": fullWidth,
          })}
        >
          {(!floating && (
            <label
              htmlFor={`${idEl}-${name}`}
              className={classNames({
                "block font-medium leading-6 text-gray-900 mb-2": true,
                "text-sm": textSize === "sm",
                "text-md": textSize === "md",
                "text-lg": textSize === "lg",
              })}
            >
              {label}
              {required ? <span className="text-red-400 ml-1">*</span> : null}
            </label>
          )) || <></>}

          <div
            className={classNames({
              "flex border  items-center rounded-sm shadow-sm overflow-hidden ":
                true,
              "border-gray-300 focus-within:border-emerald-600": !error,
              "border-red-500": error,
            })}
          >
            {Icon ? (
              <span className="block pl-3">
                <Icon />
              </span>
            ) : null}
            <div className="flex-1 flex items-center relative">
              <input
                ref={ref}
                type="text"
                readOnly={readOnly}
                onFocus={onFocus}
                required
                name={name}
                id={`${idEl}-${name}`}
                autoComplete={name}
                className={classNames({
                  "w-full border-0 bg-transparent px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:shadow-none":
                    true,
                  "pt-5 pb-1": floating,
                  "px-3 py-2": !floating && size === "md",
                  "px-2 py-1": !floating && size === "sm",
                  "px-4 py-3": !floating && size === "lg",
                  "text-sm": textSize === "sm",
                })}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                {...rest}
              />
              {(floating && (
                <label
                  htmlFor={`${idEl}-${name}`}
                  className="block font-medium leading-6 text-gray-900 absolute left-3 pointer-events-none"
                >
                  {label}
                  {(required && (
                    <span className="text-red-400 ml-1">*</span>
                  )) || <></>}
                </label>
              )) || <></>}
            </div>
          </div>
        </div>
        {error && <p className="error text-xs text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);

export default memo(Input);
