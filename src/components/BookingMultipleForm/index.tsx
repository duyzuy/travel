"use client";
import React, { memo } from "react";
import styles from "./bookingMultipleForm.module.scss";

import BookingTabs from "./partials/BookingTabs";

import BookingFlightSearchForm from "@/app/[lang]/components/BookingFlightSearchForm";
const BookingMultipleForm: React.FC<{
  children?: React.ReactNode;
}> = () => {
  return (
    <div className={styles.wrapper}>
      <div className="booking-box-container mx-auto">
        <BookingTabs />
        <div className="booking-form-wrapper px-3 pt-8 pb-8">
          <BookingFlightSearchForm />
        </div>
      </div>
    </div>
  );
};
export default memo(BookingMultipleForm);
