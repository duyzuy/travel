"use client";

import React, { memo } from "react";
import LuggageItem from "@/components/LuggageItem";
const LuggagesBySectors = () => {
  const LUGGAGE_ITEMS = [
    { id: "luggage-1", name: "30kg", price: 150000, current: true },
    { id: "luggage-2", name: "40kg", price: 350000, current: false },
    { id: "luggage-3", name: "50kg", price: 500000, current: false },
    { id: "luggage-4", name: "60kg", price: 700000, current: false },
    { id: "luggage-5", name: "70kg", price: 800000, current: false },
    { id: "luggage-6", name: "80kg", price: 950000, current: false },
  ];
  return (
    <div className="luggages-add-in bg-white">
      <div className="luggage-sector-addon mb-6">
        <div className="sector-label py-4 mb-2 bg-emerald-50 px-6">
          <span className="bg-emerald-500 rounded-sm px-2 py-1 mr-2 mb-2 inline-block text-sm text-white shadow-sm">
            Chuyến đi
          </span>
          <p className="flex items-center">
            <span>TP Hồ Chí Minh SGN</span>
            <span className="mx-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                ></path>
              </svg>
            </span>
            <span>Hà Nội (HAN) </span>
          </p>
        </div>
        <div className="note px-6">
          <div className="luggage-note px-4 py-2 bg-sky-50 rounded-sm mb-6">
            <p className="text-sky-600">
              Hạng vé đã bao gồm 7kg hành lý xách tay và 10kg hành lý ký gửi
            </p>
          </div>
        </div>

        <div className="pax-luggage-add-ons px-6">
          <div className="pax-luggage-item">
            <div className="pax-full-name py-2 w-52">
              <p>NGUYEN, VAN A</p>
            </div>
            <div className="luggage-packages flex items-center flex-wrap flex-1">
              {LUGGAGE_ITEMS.map((item) => (
                <LuggageItem
                  key={`dep-a-${item.id}`}
                  data={item}
                  isSelected={item.current}
                />
              ))}
            </div>
          </div>
          <div className="pax-luggage-item">
            <div className="pax-full-name py-2 w-52">
              <div className="flex items-center">
                <p>NGUYEN, VAN B</p>
              </div>
            </div>
            <div className="luggage-packages flex items-center flex-wrap flex-1">
              {LUGGAGE_ITEMS.map((item) => (
                <LuggageItem
                  key={`dep-b-${item.id}`}
                  data={item}
                  isSelected={item.current}
                />
              ))}
            </div>
          </div>
          <div className="pax-luggage-item">
            <div className="pax-full-name py-2 w-52">
              <div className="flex items-center">
                <p>HOANG, NGUYEN ANH THU</p>
              </div>
            </div>
            <div className="luggage-packages flex items-center flex-wrap flex-1">
              {LUGGAGE_ITEMS.map((item) => (
                <LuggageItem
                  key={`dep-c-${item.id}`}
                  data={item}
                  isSelected={item.current}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="luggage-sector-addon">
        <div className="sector-label py-4 mb-2 bg-orange-50 px-6">
          <span className="bg-orange-500 rounded-sm px-2 py-1 mr-2 mb-2 inline-block text-sm text-white shadow-sm">
            Chuyến về
          </span>
          <p className="flex items-center">
            <span>Hà Nội (HAN) </span>
            <span className="mx-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                ></path>
              </svg>
            </span>
            <span>TP Hồ Chí Minh SGN</span>
          </p>
        </div>
        <div className="pax-luggage-add-ons px-6">
          <div className="pax-luggage-item border-b border-dashed mb-4">
            <div className="pax-full-name py-2 w-52">
              <div className="flex items-center">
                <p>NGUYEN, VAN A</p>
              </div>
            </div>
            <div className="luggage-packages flex items-center flex-wrap flex-1">
              {LUGGAGE_ITEMS.map((item) => (
                <LuggageItem
                  key={`rt-a-${item.id}`}
                  data={item}
                  isSelected={item.current}
                />
              ))}
            </div>
          </div>
          <div className="pax-luggage-item border-b border-dashed mb-4">
            <div className="pax-full-name py-2 w-52">
              <div className="flex items-center">
                <p>NGUYEN, VAN B</p>
              </div>
            </div>
            <div className="luggage-packages flex items-center flex-wrap flex-1">
              {LUGGAGE_ITEMS.map((item) => (
                <LuggageItem
                  key={`rt-b-${item.id}`}
                  data={item}
                  isSelected={item.current}
                />
              ))}
            </div>
          </div>
          <div className="pax-luggage-item border-b border-dashed mb-4">
            <div className="pax-full-name py-2 w-52">
              <div className="flex items-center">
                <p>HOANG, NGUYEN ANH THU</p>
              </div>
            </div>
            <div className="luggage-packages flex items-center flex-wrap flex-1">
              {LUGGAGE_ITEMS.map((item) => (
                <LuggageItem
                  key={`rt-c-${item.id}`}
                  data={item}
                  isSelected={item.current}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(LuggagesBySectors);
