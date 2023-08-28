"use client";

import Input from "@/components/base/Input";
import { useRef, useState } from "react";

export interface IValueBirthOfDay {
  value: string;
  mask: string;
  day: string;
  month: string;
  year: string;
}
interface IInputBirthOfDay {
  label: string;
  mask?: string;
  value?: IValueBirthOfDay;
  onChange?: ({ value, mask, day, month, year }: IValueBirthOfDay) => void;
  placeholder?: string;
  name?: string;
  required: boolean;
  textSize?: "sm" | "md" | "lg";
  className?: string;
}
const InputBirthOfDay: React.FC<IInputBirthOfDay> = ({
  label,
  mask,
  value,
  onChange,
  placeholder,
  name = "birthDate",
  required,
  textSize,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputData, setInputData] = useState<{
    value: string;
    mask: string;
    day: string;
    month: string;
    year: string;
  }>(() => {
    return (
      (value && value) || { value: "", mask: "", day: "", month: "", year: "" }
    );
  });

  const onChangeBirthDay = (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    const value = evt.currentTarget.value;

    const isDelete = value.length < inputData.value.length;

    let mask: string = "";
    const day = value.slice(0, 2);
    const month = value.slice(3, 5);
    const year = value.slice(6, 10);

    const valueWithNoMask = day.concat(month).concat(year);

    if (value.length === 2) {
      mask = isDelete ? day.slice(0, 1) : mask.concat(day, "-");
    } else if (value.length === 5) {
      mask = isDelete
        ? mask.concat(day, "-").concat(month.slice(0, 1))
        : mask.concat(day, "-").concat(month, "-");
    } else if (value.length > 6) {
      mask = mask.concat(day, "-").concat(month, "-").concat(year);
    } else {
      mask = value;
    }

    setInputData((prev) => ({
      ...prev,
      day,
      month,
      year,
      value: mask,
      mask: mask,
    }));
    onChange && onChange({ value: mask, mask, day, month, year });
  };

  return (
    <Input
      ref={inputRef}
      name={name}
      label={label}
      value={inputData.mask}
      required={required}
      placeholder={placeholder}
      floating={false}
      textSize={textSize}
      onChange={onChangeBirthDay}
      className={className}
    />
  );
};

export default InputBirthOfDay;
