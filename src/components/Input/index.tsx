"use client";
import React, { ChangeEvent, useId, useMemo, memo } from "react";
import styles from "./input.module.scss";
type PropsType = {
  className?: string;
  type?: "text" | "password";
  placeholder?: string;
  fullWidth?: boolean;
  label?: string;
  error?: boolean;
  name?: string;
  errorMessage?: string;
  showLabel?: boolean;
  iconPath?: string;
  icon?: React.ElementType;
  floating?: boolean;
  onChange?: (e?: ChangeEvent) => void;
  readOnly?: boolean;

  value?: string;
  onFocus?: () => void;
  [key: string]: any;
};
const Input: React.FC<PropsType> = ({
  className,
  type,
  placeholder,
  fullWidth = true,
  name,
  label = "Label",
  error,
  errorMessage,
  showLabel,
  iconPath,
  floating = true,
  readOnly = false,
  onChange,

  onFocus,
  value = "",
  icon,
  ...rest
}) => {
  const idEl = useId();
  const clx = useMemo(() => {
    let cls = "w-full";
    if (className) {
      cls = cls.concat(" ", className);
    }
    if (floating) {
      cls = cls.concat(" ", "floating-label");
    }
    return cls;
  }, [className]);

  const Icon = icon;
  return (
    <div className={styles.controller}>
      <div className={clx}>
        {(!floating && (
          <label
            htmlFor={`${idEl}-${name}`}
            className="block font-medium leading-6 text-gray-900 mb-2"
          >
            {label}
          </label>
        )) || <></>}

        <div className="flex border border-gray-300 items-center rounded-sm shadow-sm overflow-hidden focus-within:border-emerald-600">
          {Icon && (
            <span className="block pl-3">
              <Icon />
            </span>
          )}
          <div className="flex-1 flex items-center relative">
            <input
              type="text"
              readOnly={readOnly}
              onFocus={onFocus}
              name={name}
              id={`${idEl}-${name}`}
              autoComplete={name}
              className="w-full border-0 bg-transparent pt-5 pb-1 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:shadow-none"
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
              </label>
            )) || <></>}
          </div>
        </div>
      </div>
      {error && <p className="error text-sm">{errorMessage}</p>}
    </div>
  );
};
export default memo(Input);
