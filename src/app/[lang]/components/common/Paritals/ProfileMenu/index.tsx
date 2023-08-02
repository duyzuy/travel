"use client";
import React, { memo, useMemo, useState, useRef } from "react";
import {
  isShowLoginModalVar,
  isShowRegisterModalVar,
} from "@/cache/vars/profile";
import styles from "./profileMenu.module.scss";
import { useModal } from "@/hooks/useModal";
import { useClickOutSide } from "@/hooks/useClickOutSide";
type PropsType = {
  className?: string;
  children?: React.ReactNode;
};
const ProfileMenu: React.FC<PropsType> = ({ className }) => {
  const [isShowDropdown, setShowDropdown] = useState(false);

  const dropDownRef = useRef<HTMLDivElement>(null);
  const { onShowModal: onShowRegisterModal } = useModal(isShowRegisterModalVar);
  const { onShowModal: onShowLoginModal } = useModal(isShowLoginModalVar);

  useClickOutSide(dropDownRef, () => setShowDropdown(false));
  const isLogedIn = false;
  const clx = useMemo(() => {
    let cls = `${styles.wrapper} relative`;
    if (className) {
      cls = cls.concat(" ", className);
    }
    return cls;
  }, []);
  return (
    <div className={clx}>
      <div>
        <button
          type="button"
          className="flex items-center rounded-full focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 py-2 px-2 md:px-3"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
              className="w-6 h-6 bg-emerald-500 p-1 rounded-full"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <div className="flex items-center hidden md:block ">
            <span
              className="px-3 py-1 hover:bg-gray-100 rounded-full"
              onClick={onShowRegisterModal}
            >
              Đăng ký
            </span>
            <span>|</span>
            <span
              className="px-3 py-1 hover:bg-gray-100 rounded-full"
              onClick={onShowLoginModal}
            >
              Đăng nhập
            </span>
          </div>
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
