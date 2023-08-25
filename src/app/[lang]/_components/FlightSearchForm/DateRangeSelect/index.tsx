"use client";
import React, { memo, useState, useRef, useCallback } from "react";
import Input from "@/components/base/Input";
import format from "date-fns/format";
import { useClickOutSide } from "@/hooks/useClickOutSide";
import { TRIP_DATE, TRIP_TYPE } from "@/constants/enum";
import { FORMAT_DATE } from "@/constants/config";
import DateRangPicker, {
  OnUpdateCalendarType,
} from "@/components/base/DateRangePicker";
import add from "date-fns/add";
import classNames from "classnames";
import { isAfter, isBefore, startOfToday } from "date-fns";
import { CalendarIcon } from "@/components/Icons";
import styles from "./inputDateRange.module.scss";
import { ISearchDate } from "@/modules/bookingTicket/searchBookingForm.interface";

interface Props {
  locale: Locale;
  tripType: TRIP_TYPE;
  className?: string;
  onSelectDateRange: (
    action: "update" | "reset",
    tripDate?: TRIP_DATE,
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

  const [selecting, setSelecting] = useState<TRIP_DATE | null>(null);
  const [isShowCalendar, setShowCalendar] = useState(false);

  useClickOutSide(calendarRef, () => {
    setShowCalendar(false);
    setSelecting(null);
  });

  const onResetDateRangge = () => {
    onSelectDateRange("reset");
    setSelecting(TRIP_DATE.DATE_FROM);
  };
  const onFocusInputDate = (isSelected: TRIP_DATE) => {
    if (departDate) {
      setSelecting(TRIP_DATE.DATE_FROM);
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

        if (selecting === TRIP_DATE.DATE_FROM) {
          onSelectDateRange("update", TRIP_DATE.DATE_FROM, {
            date: date,
            dateStr: format(date, FORMAT_DATE),
          });

          onUpdateCalendar({
            key: "start",
            date: date,
          });

          if (tripType === TRIP_TYPE.ROUND_TRIP) {
            !returnDate && setSelecting(TRIP_DATE.DATE_TO);

            if (returnDate && isAfter(date, returnDate.date)) {
              onUpdateCalendar({
                key: "end",
                date: null,
              });
              onSelectDateRange("update", TRIP_DATE.DATE_TO, undefined);
              setSelecting(TRIP_DATE.DATE_TO);
            }
          }
        }

        if (selecting === TRIP_DATE.DATE_TO) {
          onUpdateCalendar({
            key: "end",
            date: date,
          });
          onSelectDateRange("update", TRIP_DATE.DATE_TO, {
            date: date,
            dateStr: format(date, FORMAT_DATE),
          });

          if (departDate && isBefore(date, departDate.date)) {
            onSelectDateRange("reset");
            onSelectDateRange("update", TRIP_DATE.DATE_FROM, {
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
          roundTrip: tripType === TRIP_TYPE.ROUND_TRIP,
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
          onFocus={() => onFocusInputDate(TRIP_DATE.DATE_FROM)}
          className={classNames({
            "depart-date": true,
            isSelecting: TRIP_DATE.DATE_FROM === selecting,
            isFilled: departDate,
          })}
        />
        {tripType === TRIP_TYPE.ROUND_TRIP ? (
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
            onFocus={() => onFocusInputDate(TRIP_DATE.DATE_TO)}
            className={classNames({
              "return-date": true,
              isSelecting: TRIP_DATE.DATE_TO === selecting,
              isFilled: returnDate,
            })}
          />
        ) : null}
      </div>
      {isShowCalendar ? (
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
          dateRangeType={tripType === TRIP_TYPE.ONEWAY ? "single" : "range"}
        />
      ) : null}
    </div>
  );
};
export default memo(DateRangeSelect);
