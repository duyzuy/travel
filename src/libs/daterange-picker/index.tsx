import React, { useCallback, useMemo, useState } from "react";
import {
  format,
  isWeekend,
  endOfMonth,
  endOfWeek,
  startOfWeek,
  isToday,
  getWeeksInMonth,
  isSameMonth,
  isBefore,
  sub,
  isSameDay,
  isAfter,
  lastDayOfWeek,
  startOfToday,
  add,
  eachDayOfInterval,
  getMonth,
  getYear,
} from "date-fns";
import vi from "date-fns/locale/vi";
import en from "date-fns/locale/en-US";
import classname from "classnames";
import styles from "./daterange.module.scss";

const NUMBER_OF_WEEK = 7;
type DatePickerProps = {
  lang?: "vi" | "en";
  numberOfMonth: number;
  onSelectDate?: (data: { start: Date | null; end: Date | null }) => void;
  startOfDate?: Date | null;
  endOfDate?: Date | null;
  currentDate?: Date | null;
};
const DateRangPicker: React.FC<DatePickerProps> = ({
  numberOfMonth = 2,
  lang = "vi",
  onSelectDate,
  endOfDate,
  startOfDate,
}) => {
  let today = startOfToday();
  let locale = lang === "vi" ? vi : en;
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (!startOfDate) {
      return format(today, "MMMM-yyyy");
    }
    return format(startOfDate, "MMMM-yyyy");
  });
  const [currentSelect, setSelectDate] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: (startOfDate && startOfDate) || null,
    end: (endOfDate && endOfDate) || null,
  });

  const daysOfWeek = eachDayOfInterval({
    start: startOfWeek(today, { weekStartsOn: 1 }),
    end: endOfWeek(today, { weekStartsOn: 1 }),
  });

  const calendars = useMemo(() => {
    let output: {
      month: Date;
      dates: Date[] | string[];
      totalWeeks: number;
      weeks: { week: number; dates: Date[] | string[] }[];
    }[] = [];
    Array.from({ length: numberOfMonth }, (_, i) => {
      const monthData = add(new Date(currentMonth), { months: i });
      const datesOfMonth = eachDayOfInterval({
        start: startOfWeek(monthData, { weekStartsOn: 1 }),
        end: endOfWeek(endOfMonth(monthData), { weekStartsOn: 1 }),
      });
      const numberOfweeksInMonth = getWeeksInMonth(new Date(monthData));

      let weeksInMonth: { week: number; dates: Date[] | string[] }[] = [];
      Array.from({ length: numberOfweeksInMonth }, (_, i) => {
        const datesInWeek = datesOfMonth
          .slice()
          .splice(NUMBER_OF_WEEK * i, NUMBER_OF_WEEK);

        weeksInMonth[i] = { week: i + 1, dates: datesInWeek };
      });
      if (numberOfweeksInMonth < 6) {
        weeksInMonth[6] = {
          week: 6,
          dates: ["&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"],
        };
      }
      output = [
        ...output,
        {
          month: monthData,
          dates: datesOfMonth,
          weeks: weeksInMonth,
          totalWeeks: numberOfweeksInMonth,
        },
      ];
    });

    return output;
  }, [numberOfMonth, currentMonth]);

  const handleNextMonth = () => {
    const nextMonth = add(new Date(currentMonth), { months: 1 });
    setCurrentMonth(format(nextMonth, "MMM-yyyy"));
  };
  const handlePrevMonth = () => {
    const prevMonth = sub(new Date(currentMonth), { months: 1 });
    console.log(prevMonth.getFullYear(), getYear(today));
    if (prevMonth.getFullYear() < getYear(today)) {
      return;
    } else if (prevMonth.getFullYear() === getYear(today)) {
      if (prevMonth.getMonth() < getMonth(today)) {
        return;
      }
    }

    setCurrentMonth(format(prevMonth, "MMM-yyyy"));
  };
  const handleSelectDate = (date: Date) => {
    let startDate: Date | null = currentSelect.start;
    let endDate: Date | null = currentSelect.end;

    if (isBefore(date, today)) {
      return;
    }
    if (currentSelect.start === null) {
      startDate = date;
    }
    if (currentSelect.start !== null && currentSelect.end === null) {
      if (isBefore(date, currentSelect.start)) {
        startDate = date;
      } else {
        endDate = date;
      }
    }

    if (currentSelect.start !== null && currentSelect.end !== null) {
      if (
        isBefore(date, currentSelect.start) ||
        isBefore(date, currentSelect.end)
      ) {
        startDate = date;
      }
      if (isBefore(currentSelect.end, date)) {
        startDate = date;
        endDate = null;
      }
    }

    setSelectDate({ start: startDate, end: endDate });
    onSelectDate && onSelectDate({ start: startDate, end: endDate });
  };

  const isSelected = useCallback(
    (date: Date, compare: "startDate" | "endDate") => {
      if (compare === "startDate") {
        if (currentSelect.start === null) {
          return false;
        }
        return isSameDay(currentSelect.start, date);
      }
      if (compare === "endDate") {
        if (currentSelect.end === null) {
          return false;
        }
        return isSameDay(currentSelect.end, date);
      }
    },
    [currentSelect]
  );
  const isInRangeDate = useCallback(
    (date: Date) => {
      if (currentSelect.start === null || currentSelect.end === null) {
        return false;
      }
      const output =
        isBefore(date, currentSelect.end) && isAfter(date, currentSelect.start);

      return output;
    },
    [currentSelect, startOfDate, endOfDate]
  );
  return (
    <>
      <div className={styles.dateRangeWrapper + " date-range"}>
        <div className="date-range-container">
          <div className="date-rang-head"></div>
          <div className="date-rang-body relative">
            <div className="calendar-actions">
              <button
                className="btn-calendar btn-prev"
                type="button"
                onClick={handlePrevMonth}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  style={{ width: 18 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                  />
                </svg>
              </button>
              <button
                className="btn-calendar btn-next"
                onClick={handleNextMonth}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  style={{ width: 18 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </button>
            </div>
            <div className="calendar-months">
              {calendars.map((dateRangeItem, monthIndx) => (
                <div className="calendar-month" key={`month-${monthIndx}`}>
                  <div className="date-range-top">
                    <span className="calendar-month-name">
                      {format(dateRangeItem.month, "MMMM, yyyy", {
                        locale: locale,
                      })}
                    </span>
                  </div>
                  <div className="calendar-body">
                    <ul className="calendar-weeks-name">
                      {daysOfWeek.map((day) => (
                        <li
                          className={classname({
                            "day-name": true,
                            "last-of-week": isSameDay(
                              lastDayOfWeek(day, { weekStartsOn: 1 }),
                              day
                            ),
                          })}
                          key={format(day, "yyyy-MM-dd")}
                        >
                          <span>
                            {format(day, "EEEEEE", { locale: locale })}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {dateRangeItem.weeks.map((week, weekInd) => (
                      <ul className="calendar-days" key={`week-${weekInd}`}>
                        {week.dates.map(
                          (date, dateInd) =>
                            (typeof date !== "string" && (
                              <li
                                className={classname({
                                  date: true,
                                  "last-day-of-week": isSameDay(
                                    lastDayOfWeek(date, {
                                      weekStartsOn: 1,
                                    }),
                                    date
                                  ),
                                  weekend: isWeekend(date),
                                  "is-today": isToday(date),
                                  "other-month": !isSameMonth(
                                    date,
                                    dateRangeItem.month
                                  ),
                                  disable: isBefore(date, today),
                                  "is-selected":
                                    isSelected(date, "startDate") ||
                                    isSelected(date, "endDate"),
                                  "in-date-range": isInRangeDate(date),
                                })}
                                key={format(date, "yyyy-MM-dd")}
                                onClick={() => handleSelectDate(date)}
                              >
                                <time dateTime={format(date, "yyyy-MM-dd")}>
                                  {format(date, "d")}
                                </time>
                              </li>
                            )) || (
                              <li
                                className="date invalid facker"
                                key={`faker-${dateInd}`}
                              ></li>
                            )
                        )}
                      </ul>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="calendar-bottom">
            <button type="button" className="btn-calendar btn-reset">
              Đặt lại
            </button>
            <button className="btn-calendar btn-confirm" type="button">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default DateRangPicker;
