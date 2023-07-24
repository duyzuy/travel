"use client";
import React, { memo } from "react";
import Image from "next/image";
import classNames from "classnames";
import { LanguageType } from "@/Models/language";
const LangItem: React.FC<{
  data: LanguageType;
  isActive: boolean;
  onClick: (data: LanguageType) => void;
}> = ({ data, isActive, onClick }) => {
  return (
    <li
      className={classNames({
        "px-2 py-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer  transition-all rounded-sm":
          true,
        isActive: isActive,
      })}
      onClick={() => onClick(data)}
    >
      <p className="flex items-center">
        <span className="inline-block w-6 h-6 relative">
          <Image
            src={data.url}
            alt={data.name}
            fill
            className="rounded-full"
            style={{ objectFit: "cover" }}
          />
        </span>
        <span className="inline-block ml-2">{data.name}</span>
      </p>
      {(isActive && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 text-emerald-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )) || <></>}
    </li>
  );
};
export default memo(LangItem);
