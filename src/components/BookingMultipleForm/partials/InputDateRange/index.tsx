"use client";
import React, { memo, useState, useRef, useCallback } from "react";
import Input from "@/components/Input";
import format from "date-fns/format";
import { useClickOutSide } from "@/hooks/useClickOutSide";
import { useBookingInformation } from "@/hooks/useBooking";
import { bookingInformationVar } from "@/cache/vars";
import { TripDate, TripType } from "@/Models/booking";
import { useReactiveVar } from "@apollo/client";
import { FORMAT_DATE } from "@/constants/config";
import DateRangPicker, {
  OnUpdateCalendarType,
} from "@/components/DateRangePicker";
import add from "date-fns/add";
import classNames from "classnames";
import { isAfter, isBefore, startOfToday } from "date-fns";
import { CalendarIcon } from "@/components/Icons";
import styles from "./inputDateRange.module.scss";
const InputDateRange: React.FC<{
  locale: Locale;
}> = ({ locale }) => {
  const calendarRef = useRef<HTMLDivElement>(null);

  const [selecting, setSelecting] = useState<TripDate | null>(null);
  const [isShowCalendar, setShowCalendar] = useState(false);

  useClickOutSide(calendarRef, () => {
    setShowCalendar(false);
    setSelecting(null);
  });

  const {
    operations: { onUpdateBookingTripDate },
  } = useBookingInformation(bookingInformationVar);

  const { departDate, returnDate, tripType } = useReactiveVar(
    bookingInformationVar
  );

  const onResetDateRangge = () => {
    onUpdateBookingTripDate("reset");
    setSelecting(TripDate.DATE_FROM);
  };
  const onFocusInputDate = (isSelected: TripDate) => {
    if (departDate.date === null) {
      setSelecting(TripDate.DATE_FROM);
    } else {
      console.log(isSelected);
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
          onUpdateBookingTripDate("update", {
            tripDate: TripDate.DATE_FROM,
            date: date,
          });

          onUpdateCalendar({
            key: "start",
            date: date,
          });

          if (tripType === TripType.ROUND_TRIP) {
            returnDate.date === null && setSelecting(TripDate.DATE_TO);

            if (returnDate.date !== null && isAfter(date, returnDate.date)) {
              onUpdateCalendar({
                key: "end",
                date: null,
              });
              onUpdateBookingTripDate("update", {
                tripDate: TripDate.DATE_TO,
                date: null,
              });
              setSelecting(TripDate.DATE_TO);
            }
          }
        }

        if (selecting === TripDate.DATE_TO) {
          onUpdateCalendar({
            key: "end",
            date: date,
          });
          onUpdateBookingTripDate("update", {
            tripDate: TripDate.DATE_TO,
            date: date,
          });

          if (departDate.date !== null && isBefore(date, departDate.date)) {
            onUpdateBookingTripDate("reset");
            onUpdateBookingTripDate("update", {
              tripDate: TripDate.DATE_FROM,
              date: date,
            });
            onUpdateCalendar({
              key: "start",
              date: date,
            });
          }
        }
      },
      [onFocusInputDate, selecting, departDate.date, returnDate.date, tripType]
    );
  return (
    <div
      className={
        styles.wrapper + " block w-full booking-input-date-container relative"
      }
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
            isFilled: departDate.date !== null,
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
              isFilled: returnDate.date !== null,
            })}
          />
        )) || <></>}
      </div>
      {isShowCalendar && (
        <div className="date-range-piker">
          <DateRangPicker
            numberOfMonth={2}
            onUpdateCalendar={handleChangeTripDateOnBookingAndCalendar}
            startOfDate={departDate.date}
            endOfDate={returnDate.date}
            minDate={new Date()}
            maxDate={add(new Date(), { months: 6 })}
            onReset={onResetDateRangge}
            onConfirm={() => {
              setShowCalendar(false);
              setSelecting(null);
            }}
            dateRangeType={
              (tripType === TripType.ONEWAY && "single") || "range"
            }
          />
        </div>
      )}
    </div>
  );
};
export default memo(InputDateRange);
