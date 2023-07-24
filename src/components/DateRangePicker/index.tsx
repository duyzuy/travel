import React, { useCallback, useMemo, useState } from "react";
import {
  format,
  endOfMonth,
  endOfWeek,
  startOfWeek,
  getWeeksInMonth,
  isSameMonth,
  isBefore,
  sub,
  isSameDay,
  isAfter,
  startOfToday,
  add,
  eachDayOfInterval,
  differenceInMonths,
  startOfMonth,
  startOfDay,
} from "date-fns";
import vi from "date-fns/locale/vi";
import en from "date-fns/locale/en-US";
import classname from "classnames";
import {
  NextCalendarButton,
  PrevCalendarButton,
  ButtonConfirm,
  ButtonReset,
} from "./ButtonActions";
import DayNameOfWeek from "./DaysNameOfWeek";
import styles from "./dateRange.module.scss";
import DateItem from "./DateItem";

const NUMBER_OF_WEEK = 7;

export type OnUpdateCalendarType = (
  date: Date,
  updateCalendar: ({
    key,
    date,
  }: {
    key: "start" | "end";
    date: Date | null;
  }) => void
) => void;
type DatePickerProps = {
  lang?: "vi" | "en";
  numberOfMonth: number;
  onUpdateCalendar?: OnUpdateCalendarType;
  startOfDate?: Date | null;
  endOfDate?: Date | null;
  currentDate?: Date | null;
  minDate?: Date | null;
  maxDate?: Date | null;
  onReset?: () => void;
  onConfirm?: () => void;
  onStartDate?: () => void;
  onEndDate?: () => void;
  dateRangeType?: "single" | "range";
};
const DateRangPicker: React.FC<DatePickerProps> = ({
  numberOfMonth = 2,
  lang = "vi",
  onUpdateCalendar,
  endOfDate = null,
  startOfDate = null,
  onReset,
  onConfirm,
  minDate = null,
  maxDate = null,
  dateRangeType = "range",
}) => {
  let today = startOfToday();
  let locale = lang === "vi" ? vi : en;

  const [calendarInfor, setCalendarInfor] = useState<{
    today: Date;
    numberMonthViews: number;
    selecting: {
      start: typeof endOfDate;
      end: typeof startOfDate;
    };
    minDate: typeof minDate;
    maxDate: typeof maxDate;
    dateRangeType: typeof dateRangeType;
    currentMonth: Date;
  }>(() => {
    return {
      today: startOfToday(),
      currentMonth:
        (startOfDate !== null && startOfMonth(startOfDate)) ||
        startOfMonth(startOfToday()),
      numberMonthViews: numberOfMonth,
      minDate: (minDate && minDate) || null,
      maxDate: (maxDate && maxDate) || null,
      dateRangeType: dateRangeType,
      selecting: {
        start: (startOfDate && startOfDate) || null,
        end: (endOfDate && endOfDate) || null,
      },
    };
  });

  const calendars = useMemo(() => {
    let output: {
      month: Date;
      dates: Date[] | string[];
      totalWeeks: number;
      weeks: { week: number; dates: Date[] | string[] }[];
    }[] = [];

    Array.from({ length: calendarInfor.numberMonthViews }, (_, i) => {
      let monthData = add(calendarInfor.currentMonth, { months: i });

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
  }, [calendarInfor.numberMonthViews, calendarInfor.currentMonth]);

  const onNextAndPrevByMonth = (action: "next" | "prev") => {
    let newMonthUpdate = calendarInfor.currentMonth;

    if (calendarInfor.minDate !== null) {
      const differenceMonths = differenceInMonths(
        calendarInfor.currentMonth,
        startOfMonth(calendarInfor.minDate)
      );

      if (action === "prev" && differenceMonths === 0) return;
    }

    if (calendarInfor.maxDate !== null) {
      const differenceCurrentMonthFromToday = differenceInMonths(
        calendarInfor.currentMonth,
        startOfMonth(today)
      );

      const differenceMaxDateMonthFromToday = differenceInMonths(
        startOfMonth(calendarInfor.maxDate),
        startOfMonth(today)
      );

      if (
        action === "next" &&
        differenceCurrentMonthFromToday + calendarInfor.numberMonthViews >
          differenceMaxDateMonthFromToday
      )
        return;
    }

    newMonthUpdate =
      action === "next"
        ? add(calendarInfor.currentMonth, { months: 1 })
        : sub(calendarInfor.currentMonth, { months: 1 });

    setCalendarInfor((prev) => ({
      ...prev,
      currentMonth: newMonthUpdate,
    }));
  };
  const handleSelectDate = (selectedDate: Date) => {
    if (onUpdateCalendar) {
      if (
        calendarInfor.maxDate !== null &&
        isAfter(selectedDate, endOfMonth(calendarInfor.maxDate))
      ) {
        console.warn(`date update is larger than maxDate`);
        return;
      }

      if (
        calendarInfor.minDate !== null &&
        isBefore(selectedDate, calendarInfor.minDate)
      ) {
        console.warn(`date update is less than minDate`);

        return;
      }

      onUpdateCalendar(selectedDate, ({ key, date }) => {
        if (dateRangeType === "single" && key === "end") {
          console.warn(`key only accept start with dateType single`);
          return;
        }
        return setCalendarInfor((prev) => ({
          ...prev,
          selecting: {
            ...prev.selecting,
            [key]: date,
          },
        }));
      });
    } else {
      let startDate: Date | null = calendarInfor.selecting.start;
      let endDate: Date | null = calendarInfor.selecting.end;

      if (
        calendarInfor.minDate !== null &&
        isBefore(selectedDate, startOfDay(calendarInfor.minDate))
      ) {
        return;
      }
      if (calendarInfor.selecting.start === null) {
        startDate = selectedDate;
      }
      if (
        calendarInfor.selecting.start !== null &&
        calendarInfor.selecting.end === null
      ) {
        if (isBefore(selectedDate, startOfDay(calendarInfor.selecting.start))) {
          startDate = selectedDate;
        } else {
          endDate = selectedDate;
        }
      }

      if (
        calendarInfor.selecting.start !== null &&
        calendarInfor.selecting.end !== null
      ) {
        startDate = selectedDate;
        endDate = null;
      }

      setCalendarInfor((prev) => ({
        ...prev,
        selecting: {
          start: startDate,
          end: endDate,
        },
      }));
    }
  };
  const isSelected = useCallback(
    (date: Date, compare: "startDate" | "endDate") => {
      if (compare === "startDate") {
        if (calendarInfor.selecting.start === null) {
          return false;
        }
        return isSameDay(calendarInfor.selecting.start, date);
      }

      if (dateRangeType === "single") return false;

      if (compare === "endDate") {
        if (calendarInfor.selecting.end === null) {
          return false;
        }
        return isSameDay(calendarInfor.selecting.end, date);
      }
      return false;
    },
    [calendarInfor.selecting, dateRangeType]
  );
  const isInRangeDate = useCallback(
    (date: Date) => {
      if (dateRangeType === "single") return false;
      if (
        calendarInfor.selecting.start === null ||
        calendarInfor.selecting.end === null
      ) {
        return false;
      }
      const output =
        isBefore(date, calendarInfor.selecting.end) &&
        isAfter(date, calendarInfor.selecting.start);

      return output;
    },
    [calendarInfor.selecting, dateRangeType]
  );
  const onResetDate = () => {
    onReset && onReset();

    setCalendarInfor((prev) => ({
      ...prev,
      selecting: {
        start: null,
        end: null,
      },
    }));
  };
  const isDisableDate = useCallback((compare: "min" | "max", date: Date) => {
    if (compare === "min") {
      if (calendarInfor.minDate === null) return false;

      return isBefore(date, startOfDay(calendarInfor.minDate));
    }

    if (compare === "max") {
      if (calendarInfor.maxDate === null) return false;

      return isBefore(endOfMonth(calendarInfor.maxDate), date);
    }

    return false;
  }, []);

  return (
    <>
      <div className={styles.dateRangeWrapper + " date-range"}>
        <div className="date-range-container">
          <div className="date-rang-head"></div>
          <div className="date-rang-body relative">
            <div className="calendar-actions">
              <PrevCalendarButton onClick={onNextAndPrevByMonth} />
              <NextCalendarButton onClick={onNextAndPrevByMonth} />
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
                    <DayNameOfWeek locale={vi} />
                    {dateRangeItem.weeks.map((week, weekInd) => (
                      <ul className="calendar-days" key={`week-${weekInd}`}>
                        {week.dates.map(
                          (date, dateInd) =>
                            (typeof date !== "string" && (
                              <DateItem
                                key={format(date, "yyyy-MM-dd")}
                                date={date}
                                isSelectedEnd={isSelected(date, "endDate")}
                                isSelectedStart={isSelected(date, "startDate")}
                                isNotSameMonth={
                                  !isSameMonth(date, dateRangeItem.month)
                                }
                                isDisable={
                                  isDisableDate("min", date) ||
                                  isDisableDate("max", date)
                                }
                                isInRange={isInRangeDate(date)}
                                onClick={handleSelectDate}
                              />
                            )) || (
                              <li
                                className="date invalid faker"
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
            <ButtonReset
              onClick={onResetDate}
              isDisable={
                calendarInfor.selecting.start === null ||
                calendarInfor.selecting.end === null
              }
            />

            <ButtonConfirm
              onClick={onConfirm}
              isDisable={
                calendarInfor.selecting.start === null ||
                calendarInfor.selecting.end === null
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default DateRangPicker;
