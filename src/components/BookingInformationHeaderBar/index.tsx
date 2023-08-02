"use client";

import { memo } from "react";

const BookingInformationHeaderBar = () => {
  return (
    <div className="bg-emerald-500 py-6">
      <div className="container mx-auto">
        <div className="select-flight-information">
          <p className="round-trip flex items-center text-white">
            <span className="depart-name">TP Hồ Chí Minh (SGN)</span>
            <span className="trip-type mx-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </span>
            <span className="depart-name">Hà Nội (HAN)</span>
          </p>
          <p className="trip-info text-sm text-white">
            <span>Khứ hồi</span>
            <span className="mx-1">|</span>
            <span className="">Thứ 3, 15 tháng 8</span>
            <span className="mx-1">|</span>
            <span>1 người lớn, 1 trẻ em</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default memo(BookingInformationHeaderBar);
