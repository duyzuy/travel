"use client";
import React, { memo, useState, useRef, useEffect } from "react";
import Input from "@/components/Input";
import format from "date-fns/format";
import DateRangPicker from "@/libs/daterange-picker";
import { useClickOutSide } from "@/hooks/useClickOutSide";
import styles from "./inputDateRange.module.scss";
import { CalendaIcon } from "@/assets/icons";
const InputDateRange: React.FC<{
  locale: Locale;
}> = ({ locale }) => {
  const calendarRef = useRef<HTMLDivElement>(null);

  const [date, setDate] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  const [isShowCalendar, setShowCalendar] = useState(false);

  useClickOutSide(calendarRef, () => setShowCalendar(false));

  const onChangeDate = (data: { start: Date | null; end: Date | null }) => {
    setDate(data);
  };

  return (
    <div
      className={
        styles.wrapper + " block w-full booking-input-date-container relative"
      }
      ref={calendarRef}
    >
      <div className="flex flex-1 input-date">
        <Input
          showLabel={false}
          iconPath={CalendaIcon}
          placeholder="Ngày đi"
          label="Ngày đi"
          name="departDate"
          readOnly
          value={
            date.start && format(date.start, "dd MMM, yyyy", { locale: locale })
          }
          onClick={() => setShowCalendar(true)}
        />
        <Input
          showLabel={false}
          placeholder="Ngày về"
          label="Ngày về"
          readOnly
          name="returnDate"
          value={
            date.end && format(date.end, "dd MMM, yyyy", { locale: locale })
          }
          onClick={() => setShowCalendar(true)}
        />
      </div>
      {isShowCalendar && (
        <div className="date-range-piker">
          <DateRangPicker
            numberOfMonth={2}
            onSelectDate={onChangeDate}
            startOfDate={date.start}
            endOfDate={date.end}
          />
        </div>
      )}
    </div>
  );
};
export default memo(InputDateRange);
