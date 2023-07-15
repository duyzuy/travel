"use client";
import { FlagEn, FlagVi } from "@/assets/icons";
import Image from "next/image";
import styles from "./languageSwitcher.module.css";
import { memo, useMemo, useState } from "react";
type PropsType = {
  className?: string;
  children?: React.ReactNode;
};
const LanguageSwitcher: React.FC<PropsType> = ({ className }) => {
  const [isShowDropdown, setShowDropdown] = useState(false);
  const clx = useMemo(() => {
    let cls = "relative";
    if (className) {
      cls = cls.concat(" ", className);
    }

    return cls;
  }, [className]);
  return (
    <div className={`${styles.wrapper} ${clx}`}>
      <div className="lang-item">
        <button
          className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 py-2 px-2 md:px-3"
          type="button"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <span className="inline-block w-6 h-6 relative">
            <Image
              src={FlagVi}
              alt="vietnamese"
              fill
              className="rounded-full"
              style={{ objectFit: "cover" }}
            />
          </span>
          <span className="inline-block ml-2 hidden md:block">
            Tiếng Việt
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
        <div className="lang-dropdown absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-sm bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ul className={styles.langList}>
            <li className="px-4 py-2 flex items-center">
              <span className="inline-block w-6 h-6 relative">
                <Image
                  src={FlagVi}
                  alt="Tiếng Việt"
                  fill
                  className="rounded-full"
                  style={{ objectFit: "cover" }}
                />
              </span>
              <span className="inline-block ml-2">Tiếng Việt</span>
            </li>
            <li className="px-4 py-2 flex items-center">
              <span className="inline-block w-6 h-6 relative">
                <Image
                  src={FlagEn}
                  alt="Tiếng Anh"
                  className="rounded-full"
                  style={{ objectFit: "cover" }}
                  fill
                />
              </span>
              <span className="inline-block ml-2">Tiếng Anh</span>
            </li>
          </ul>
        </div>
      )) || <></>}
    </div>
  );
};
export default memo(LanguageSwitcher);
