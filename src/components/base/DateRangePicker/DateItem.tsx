"use client";
import React, { memo } from "react";
import classNames from "classnames";
import { convertSolar2Lunar } from "@/utils/convertSolartoLunarYear";
import {
  format,
  startOfWeek,
  isSameDay,
  lastDayOfWeek,
  isWeekend,
  isToday,
  isSameMonth,
} from "date-fns";
const DateItem: React.FC<{
  date: Date;
  isDisable: boolean;
  isSelectedStart: boolean;
  isSelectedEnd: boolean;
  isInRange: boolean;
  onClick: (date: Date) => void;
  isNotSameMonth: boolean;
}> = ({
  date,
  isDisable = false,
  isSelectedStart = false,
  isSelectedEnd = false,
  onClick,
  isInRange = false,
  isNotSameMonth = false,
}) => {
  const getLunarYearFromSolarYear = (date: Date) => {
    const lunarDateValue = convertSolar2Lunar(
      Number(format(date, "dd")),
      Number(format(date, "MM")),
      Number(format(date, "yyyy")),
      7.0
    );

    if (lunarDateValue[0] === 1) {
      return `${lunarDateValue[0]}/${lunarDateValue[1]}`;
    }
    return lunarDateValue[0];
  };

  return (
    <li
      className={classNames({
        date: true,
        "last-day-of-week": isSameDay(
          lastDayOfWeek(date, {
            weekStartsOn: 1,
          }),
          date
        ),
        "start-of-week": isSameDay(
          startOfWeek(date, {
            weekStartsOn: 1,
          }),
          date
        ),
        weekend: isWeekend(date),
        "is-today": isToday(date),
        "other-month": isNotSameMonth,
        disable: isDisable,
        "is-selected start": isSelectedStart,
        "is-selected end": isSelectedEnd,
        "in-date-range": isInRange,
      })}
      key={format(date, "yyyy-MM-dd")}
      onClick={() => onClick(date)}
    >
      <span className="text-xs text-gray-500 absolute bottom-0 right-1 luna-date z-20">
        {getLunarYearFromSolarYear(date)}
      </span>
      <time dateTime={format(date, "yyyy-MM-dd")} className="relative z-20">
        {format(date, "d")}
      </time>
    </li>
  );
};
export default memo(DateItem);
