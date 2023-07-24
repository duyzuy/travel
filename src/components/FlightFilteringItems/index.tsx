"use client";
import React, { memo } from "react";

import FilterTimes from "./FilterTimes";
import FilterBrands from "./FilterBrands";

const FlightFilteringItems = () => {
  return (
    <div className="select-flight-left bg-white shadow-sm rounded-sm px-4">
      <div className="filter-head flex items-center justify-between border-b py-4">
        <p className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
          <span className="font-bold">Bộ lọc</span>
        </p>
        <button className="px-2 py-1 rounded-sm text-xs text-emerald-600 border border-emerald-500 hover:bg-emerald-500 hover:text-white">
          Đặt lại
        </button>
      </div>
      <div className="filter-body">
        <div className="box-filter border-b pb-4">
          <div className="inner">
            <div className="box-filter-head pt-6 pb-2">
              <p className="font-bold">Hãng hàng không</p>
            </div>
            <div className="box-filter-body">
              <FilterBrands />
            </div>
          </div>
        </div>
        <div className="box-filter pb-4">
          <div className="inner">
            <div className="box-filter-head pt-6 pb-2">
              <p className="font-bold">Thời gian bay</p>
            </div>
            <div className="box-filter-body">
              <FilterTimes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(FlightFilteringItems);
