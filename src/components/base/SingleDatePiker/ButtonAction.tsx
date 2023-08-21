"use client";
import React, { memo } from "react";
export enum ButtonAction {
  NEXT = "next",
  PREV = "prev",
}

export const ButtonNext: React.FC<{ onClick: (action: ButtonAction) => void }> =
  memo(({ onClick }) => {
    return (
      <button
        type="button"
        className="next single-date-btn cursor-pointer hover:bg-emerald-500 rounded-tl-full rounded-bl-full hover:text-white transition-colors bg-slate-100"
        onClick={() => onClick(ButtonAction.NEXT)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    );
  });

export const ButtonPrev: React.FC<{ onClick: (action: ButtonAction) => void }> =
  memo(({ onClick }) => {
    return (
      <button
        type="button"
        className="prev single-date-btn cursor-pointer hover:bg-emerald-500 rounded-tr-full rounded-br-full hover:text-white transition-colors bg-slate-100"
        onClick={() => onClick(ButtonAction.PREV)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
    );
  });
