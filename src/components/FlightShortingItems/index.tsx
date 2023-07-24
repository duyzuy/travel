"use client";

import React, { memo } from "react";

const FlightShortingItems: React.FC = () => {
  return (
    <div className="flights-sorting shadow-sm rounded-sm bg-white px-3 py-2 mb-4">
      <div className="inner flex items-center">
        <div className="sorting-head flex items-center">
          <span className="icon p-2 mr-1">
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
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
          </span>
          <span className="font-bold">Sắp xếp theo</span>
        </div>
        <div className="sorting-body pl-4 flex-1">
          <ul className="sort-list flex items-center justify-items-end justify-end flex-1 gap-x-3">
            <li className="item px-3 py-1 bg-emerald-500 text-white rounded-md text-sm">
              <span>Giá thấp nhất</span>
            </li>
            <li className="item px-3 py-1 rounded-sm hover:bg-slate-100 transition-colors cursor-pointer text-sm">
              <span>Cất cánh sớm nhất</span>
            </li>
            <li className="item px-3 py-1 rounded-sm hover:bg-slate-100 transition-colors cursor-pointer text-sm">
              <span>Bay nhanh nhất</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(FlightShortingItems);
