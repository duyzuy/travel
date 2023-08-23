"use client";
import classNames from "classnames";
const Step = ({
  active,
  name,
  num,
}: {
  active: boolean;
  name: string;
  num: number;
}) => {
  return (
    <li
      className={classNames({
        "step flex items-center": true,
        "text-gray-600": !active,
        "text-emerald-500": active,
      })}
    >
      <span
        className={classNames({
          "number w-6 h-6  rounded-full flex items-center justify-center mr-2":
            true,
          "bg-gray-100": !active,
          "bg-emerald-500 text-white": active,
        })}
      >
        {num}
      </span>
      <span className="text">{name}</span>
    </li>
  );
};
export default Step;
