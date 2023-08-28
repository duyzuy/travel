"use client";
import React, { memo, ChangeEvent, useId } from "react";
import styles from "./checkbox.module.scss";
import classNames from "classnames";

type PropsType = {
  className?: string;
  label?: string;
  onChange?: (
    e?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLSpanElement>
  ) => void;
  type?: "checkbox" | "radio";
  name?: string;
  isChecked?: boolean;
  value?: string;
};
const Checkbox: React.FC<PropsType> = ({
  className = "",
  onChange,
  label,
  type = "checkbox",
  name = "name",
  isChecked = false,
  value = "",
}) => {
  const checkboxId = useId();

  return (
    <div
      className={classNames({
        [styles.wrapper]: styles.wrapper,
        [className]: className,
        [type]: type,
      })}
    >
      <div className={`inline-flex relative items-center`}>
        <div className="input-control">
          <input
            id={`${checkboxId}-${name}`}
            type={type}
            name={name}
            readOnly
            value={value}
            checked={isChecked}
            className={`${
              type === "checkbox" ? "rounded " : " "
            }h-4 w-4  border-gray-500 text-indigo-600`}
          />
          <span
            className="input cursor-pointer border-gray-600 border"
            onClick={onChange}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              x="0px"
              y="0px"
              width={12}
              height={12}
              viewBox="0 0 405.272 405.272"
              fill="#fff"
            >
              <g>
                <path d="M393.401,124.425L179.603,338.208c-15.832,15.835-41.514,15.835-57.361,0L11.878,227.836   c-15.838-15.835-15.838-41.52,0-57.358c15.841-15.841,41.521-15.841,57.355-0.006l81.698,81.699L336.037,67.064   c15.841-15.841,41.523-15.829,57.358,0C409.23,82.902,409.23,108.578,393.401,124.425z" />
              </g>
            </svg>
          </span>
        </div>
        {(label && (
          <label htmlFor={`${checkboxId}-${name}`} className="ml-2">
            {label}
          </label>
        )) || <></>}
      </div>
    </div>
  );
};
export default memo(Checkbox);
