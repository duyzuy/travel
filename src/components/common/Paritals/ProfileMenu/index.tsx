"use client";
import React, { memo, useMemo, useState, useRef, useEffect } from "react";
import styles from "./profileMenu.module.css";

type PropsType = {
  className?: string;
  children?: React.ReactNode;
};
const ProfileMenu: React.FC<PropsType> = ({ className }) => {
  const [isShowDropdown, setShowDropdown] = useState(false);
  const clx = useMemo(() => {
    let cls = `${styles.wrapper} relative`;
    if (className) {
      cls = cls.concat(" ", className);
    }
    return cls;
  }, []);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropDownRef.current) return;
    console.log(dropDownRef);
    const onClickOutSide = (e: any) => {
      if (isShowDropdown && !dropDownRef.current?.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", onClickOutSide);

    return () => document.removeEventListener("click", onClickOutSide);
  }, [isShowDropdown]);
  return (
    <div className={clx}>
      <div>
        <button
          type="button"
          className="flex items-center rounded-full focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 py-2 px-2 md:px-3"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
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
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="inline-block ml-1 hidden md:block">Tài khoản</span>
        </button>
      </div>
      {(isShowDropdown && (
        <div
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-sm bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          ref={dropDownRef}
        >
          <a
            href="#"
            className="block px-4 py-2 text-gray-700"
            role="menuitem"
            tabIndex={1}
            id="user-menu-item-0"
          >
            Thông tin tài khoản
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700"
            role="menuitem"
            tabIndex={1}
            id="user-menu-item-1"
          >
            Cài đặt
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700"
            role="menuitem"
            tabIndex={1}
            id="user-menu-item-2"
          >
            Đăng xuất
          </a>
        </div>
      )) || <></>}
    </div>
  );
};
export default memo(ProfileMenu);
