"use client";
import React, { memo, useRef, useState } from "react";

import Image from "next/image";
import LangItem from "./LangItem";
import { LanguageType } from "@/Models/language";
import { useClickOutSide } from "@/hooks/useClickOutSide";

const LanguageComponent: React.FC<{
  currentLang: LanguageType;
  languages: LanguageType[];
  onSwitchLanguage: (langItem: LanguageType) => void;
}> = ({ currentLang, languages, onSwitchLanguage }) => {
  const [isShowDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutSide(dropdownRef, () => setShowDropdown(false));

  return (
    <>
      <div className="lang-item">
        <button
          className="flex items-center rounded-full py-2 px-2 md:px-2 hover:bg-gray-100 transition-colors"
          type="button"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <span className="inline-block w-6 h-6 relative">
            <Image
              src={currentLang.url}
              alt={currentLang.name}
              fill
              className="rounded-full"
              style={{ objectFit: "cover" }}
            />
          </span>
          <span className="ml-2 hidden md:inline-block">
            {currentLang.shortName}
            <span className="inline-block ml-1">
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
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </span>
        </button>
      </div>
      {(isShowDropdown && (
        <div
          ref={dropdownRef}
          className="lang-dropdown absolute z-10 w-48 origin-top-right left-0 rounded-sm bg-white p-2 shadow-lg border border-gray-100"
        >
          <ul className="lang-list">
            {languages.map((lang) => (
              <LangItem
                key={lang.code}
                data={lang}
                isActive={lang.code === currentLang?.code}
                onClick={onSwitchLanguage}
              />
            ))}
          </ul>
        </div>
      )) || <></>}
    </>
  );
};

export default memo(LanguageComponent);
