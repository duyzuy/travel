"use client";
import React, { useMemo, memo, ChangeEvent, useId } from "react";
import styles from "./checkbox.module.scss";
type PropsType = {
  className?: string;
  label?: string;
  onChange?: (e?: ChangeEvent) => void;
  type?: "checkbox" | "radio";
  name?: string;
  isChecked?: boolean;
};
const Checkbox: React.FC<PropsType> = ({
  className,
  onChange,
  label,
  type = "checkbox",
  name,
  isChecked = false,
}) => {
  const clx = useMemo(() => {
    let cls = "";
    if (className) {
      cls = cls.concat(" ", className);
    }
    cls = cls.concat(" ", type);

    return cls;
  }, [className, type]);
  const checkboxId = useId();

  return (
    <div className={styles.wrapper}>
      <div className={`inline-flex relative gap-x-3 items-center${clx}`}>
        <input
          id={checkboxId}
          type={type}
          onChange={onChange}
          name={name}
          checked={isChecked}
          className={`${
            type === "checkbox" ? "rounded " : " "
          }h-4 w-4  border-gray-300 text-indigo-600 focus:ring-sky-600`}
        />
        <label htmlFor={checkboxId}>{label}</label>
      </div>
    </div>
  );
};
export default memo(Checkbox);
