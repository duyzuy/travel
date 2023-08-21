"use client";
import React, { memo, useState, useRef, useCallback } from "react";
import Input from "@/components/base/Input";
import format from "date-fns/format";
import { useClickOutSide } from "@/hooks/useClickOutSide";
import { TripDate, TripType } from "@/constants/enum";
import { FORMAT_DATE } from "@/constants/config";
import DateRangPicker, {
  OnUpdateCalendarType,
} from "@/components/base/DateRangePicker";
import add from "date-fns/add";
import classNames from "classnames";
import { isAfter, isBefore, startOfToday } from "date-fns";
import { CalendarIcon } from "@/components/Icons";
import styles from "./inputDateRange.module.scss";
import { ISearchDate } from "@/Models";

interface Props {
  locale: Locale;
  tripType: TripType;
  className?: string;
  onSelectDateRange: (
    action: "update" | "reset",
    tripDate?: TripDate,
    data?: {
      date: Date;
      dateStr: string;
    }
  ) => void;
  departDate?: ISearchDate;
  returnDate?: ISearchDate;
}
const DateRangeSelect: React.FC<Props> = ({
  locale,
  onSelectDateRange,
  departDate,
  returnDate,
  tripType,
  className = "",
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);

  const [selecting, setSelecting] = useState<TripDate | null>(null);
  const [isShowCalendar, setShowCalendar] = useState(false);

  useClickOutSide(calendarRef, () => {
    setShowCalendar(false);
    setSelecting(null);
  });

  const onResetDateRangge = () => {
    onSelectDateRange("reset");
    setSelecting(TripDate.DATE_FROM);
  };
  const onFocusInputDate = (isSelected: TripDate) => {
    if (departDate) {
      setSelecting(TripDate.DATE_FROM);
    } else {
      setSelecting(isSelected);
    }
    setShowCalendar(true);
  };

  const handleChangeTripDateOnBookingAndCalendar: OnUpdateCalendarType =
    useCallback(
      (date, onUpdateCalendar) => {
        if (selecting === null) return;
        let today = startOfToday();

        if (isBefore(date, today)) return;

        if (selecting === TripDate.DATE_FROM) {
          onSelectDateRange("update", TripDate.DATE_FROM, {
            date: date,
            dateStr: format(date, FORMAT_DATE),
          });

          onUpdateCalendar({
            key: "start",
            date: date,
          });

          if (tripType === TripType.ROUND_TRIP) {
            !returnDate && setSelecting(TripDate.DATE_TO);

            if (returnDate && isAfter(date, returnDate.date)) {
              onUpdateCalendar({
                key: "end",
                date: null,
              });
              onSelectDateRange("update", TripDate.DATE_TO, undefined);
              setSelecting(TripDate.DATE_TO);
            }
          }
        }

        if (selecting === TripDate.DATE_TO) {
          onUpdateCalendar({
            key: "end",
            date: date,
          });
          onSelectDateRange("update", TripDate.DATE_TO, {
            date: date,
            dateStr: format(date, FORMAT_DATE),
          });

          if (departDate && isBefore(date, departDate.date)) {
            onSelectDateRange("reset");
            onSelectDateRange("update", TripDate.DATE_FROM, {
              date: date,
              dateStr: format(date, FORMAT_DATE),
            });
            onUpdateCalendar({
              key: "start",
              date: date,
            });
          }
        }
      },
      [onFocusInputDate, selecting, departDate, returnDate, tripType]
    );
  return (
    <div
      className={classNames({
        [styles.wrapper]: styles.wrapper,
        "block w-full booking-input-date-container relative": true,
        [className]: className,
      })}
      ref={calendarRef}
    >
      <div
        className={classNames({
          "flex flex-1 input-date": true,
          roundTrip: tripType === TripType.ROUND_TRIP,
        })}
      >
        <Input
          showLabel={false}
          icon={() => <CalendarIcon className="fill-emerald-600" />}
          placeholder="Ngày đi"
          label="Ngày đi"
          name="departDate"
          readOnly
          value={
            (departDate &&
              departDate.date &&
              format(departDate.date, FORMAT_DATE, { locale: locale })) ||
            ""
          }
          onFocus={() => onFocusInputDate(TripDate.DATE_FROM)}
          className={classNames({
            "depart-date": true,
            isSelecting: TripDate.DATE_FROM === selecting,
            isFilled: departDate,
          })}
        />
        {(tripType === TripType.ROUND_TRIP && (
          <Input
            showLabel={false}
            placeholder="Ngày về"
            icon={() => <CalendarIcon className="fill-orange-600" />}
            label="Ngày về"
            readOnly
            name="returnDate"
            value={
              (returnDate &&
                returnDate.date &&
                format(returnDate.date, FORMAT_DATE, { locale: locale })) ||
              ""
            }
            onFocus={() => onFocusInputDate(TripDate.DATE_TO)}
            className={classNames({
              "return-date": true,
              isSelecting: TripDate.DATE_TO === selecting,
              isFilled: returnDate,
            })}
          />
        )) || <></>}
      </div>
      {isShowCalendar && (
        <DateRangPicker
          numberOfMonth={2}
          onUpdateCalendar={handleChangeTripDateOnBookingAndCalendar}
          startOfDate={departDate?.date}
          endOfDate={returnDate?.date}
          minDate={new Date()}
          maxDate={add(new Date(), { months: 6 })}
          onReset={onResetDateRangge}
          onConfirm={() => {
            setShowCalendar(false);
            setSelecting(null);
          }}
          dateRangeType={(tripType === TripType.ONEWAY && "single") || "range"}
        />
      )}
    </div>
  );
};
export default memo(DateRangeSelect);
