"use client";

import React, { memo } from "react";
import classNames from "classnames";
const BookingSummary: React.FC<{ isShow?: boolean }> = ({ isShow = true }) => {
  return (
    <div
      className={classNames({
        "summary-subtotal transition": true,
        "invisible opacity-0": !isShow,
        "opacity-1": isShow,
      })}
    >
      <button type="button" className="bg-emerald-50 px-3 py-2">
        <div className="summary-inner flex items-center w-60 text-left">
          <div className="summary-cart-detail">
            <span className="text-sm block">Tổng tiền</span>
            <span className="text-xl font-bold text-emerald-500">
              <span className="amount">1,500,000</span>
              <span className="currency text-xs ml-1">VND</span>
            </span>
            <p className="note text-xs text-gray-500">Bao gồm thuế phí*</p>
          </div>
          <span className="cart-icon bg-emerald-100 p-2 rounded-full ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-emerald-500"
            >
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
          </span>
        </div>
      </button>
    </div>
  );
};
export default memo(BookingSummary);
