"use client";

import React, { memo } from "react";
import IconFlightRight from "@/components/Icons/IconFlightRight";
import classNames from "classnames";
import { formatCurrencyVND } from "@/utils/helper";
import LuggageItem from "@/components/LuggageItem";
import Checkbox from "@/components/Checkbox";
const LuggagesDropdown = () => {
  const LUGGAGE_ITEMS = [
    { id: "luggage-1", name: "30kg", price: 150000, current: true },
    { id: "luggage-2", name: "40kg", price: 350000, current: false },
    { id: "luggage-3", name: "50kg", price: 500000, current: false },
    { id: "luggage-4", name: "60kg", price: 700000, current: false },
    { id: "luggage-5", name: "70kg", price: 800000, current: false },
    { id: "luggage-6", name: "80kg", price: 950000, current: false },
  ];
  return (
    <div className="luggages-add-in bg-white px-6 py-4 border-t">
      <div className="luggage-sector-addon">
        <div className="sector-label py-2 mb-2 flex items-center">
          <div className="label flex items-center">
            <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-2">
              <IconFlightRight stroke="#fff" />
            </span>
            <p className="flex items-center">
              <span>TP Hồ Chí Minh SGN</span>
              <span className="mx-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  ></path>
                </svg>
              </span>
              <span>Hà Nội (HAN) </span>
            </p>
          </div>
        </div>
        <div className="pax-luggage-add-on">
          <div className="pax-luggage-item border-b border-dashed mb-4">
            <div className="pax-full-name py-2 w-52">
              <div className="flex items-center">
                <p>NGUYEN, VAN A</p>
              </div>
            </div>
            <div className="luggage-packages flex items-center flex-wrap flex-1">
              {LUGGAGE_ITEMS.map((item) => (
                <LuggageItem data={item} isSelected={item.current} />
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
                <LuggageItem data={item} isSelected={item.current} />
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
                <LuggageItem data={item} isSelected={item.current} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="luggage-sector-addon">
        <div className="sector-label py-2 mb-2 flex items-center">
          <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-2">
            <IconFlightRight stroke="#fff" />
          </span>
          <p className="flex items-center">
            <span>Hà Nội (HAN) </span>
            <span className="mx-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                ></path>
              </svg>
            </span>
            <span>TP Hồ Chí Minh SGN</span>
          </p>
        </div>
        <div className="pax-luggage-add-on">
          <div className="pax-luggage-item border-b border-dashed mb-4">
            <div className="pax-full-name py-2 w-52">
              <div className="flex items-center">
                <p>NGUYEN, VAN A</p>
              </div>
            </div>
            <div className="luggage-packages flex items-center flex-wrap flex-1">
              {LUGGAGE_ITEMS.map((item) => (
                <LuggageItem data={item} isSelected={item.current} />
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
                <LuggageItem data={item} isSelected={item.current} />
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
                <LuggageItem data={item} isSelected={item.current} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(LuggagesDropdown);
