"use client";

import React, { memo } from "react";

const ITEMS_RECENT = [
  {
    id: "SGN-HAN",
    depart: { code: "SGN", cityName: "Tp. Hồ Chí Minh" },
    arrival: { code: "HAN", cityName: "Hà Nội" },
  },
];
const SearchRecent = () => {
  return (
    <div className="history-search">
      <h4 className="font-bold text-sm mb-2">Tìm kiểm gần đây</h4>
      <div className="recent-search">
        <ul>
          <li className="item inline-flex px-2 py-1 bg-gray-100 text-sm rounded-sm mr-2 items-center">
            SGN - SIN · 18 Thg 07 - 29 Thg 07 2023
            <span className="remove inline-block ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default memo(SearchRecent);
