"use client";
import React, { memo } from "react";
import Image from "next/image";
import { ChildrenIcon, AdultIcon, BabyIcon } from "@/assets/icons";
import styles from "./PassengerDropdown.module.scss";
import Quantity from "@/components/Quantity";
const PassengerDropdown = () => {
  return (
    <div
      className={
        styles.wrapper +
        " bg-white px-3 py-2 w-full absolute left-0 right-0 z-20 "
      }
    >
      <div className="box-head"></div>
      <div className="box-body">
        <ul className={styles.passengers}>
          <li className="passenger px-3 py-2 flex justify-between">
            <div className="passenger-type flex items-center">
              <span className="passenger-icon inline-block mr-1">
                <Image src={AdultIcon} alt="Adult icon" className="w-8 h-8" />
              </span>
              <p className="passenger-text">
                <span className="title block">Người lớn</span>
                <span className="sub-title block text-gray-400 text-sm">
                  12 tuổi trở lên
                </span>
              </p>
            </div>
            <Quantity />
          </li>
          <li className="passenger px-3 py-2 flex justify-between">
            <div className="passenger-type flex items-center">
              <span className="passenger-icon inline-block mr-1">
                <Image
                  src={ChildrenIcon}
                  alt="Adult icon"
                  className="w-8 h-8"
                />
              </span>
              <p className="passenger-text">
                <span className="title block">Trẻ em</span>
                <span className="sub-title text-gray-400 text-sm block ">
                  2 - 11 tuổi
                </span>
              </p>
            </div>
            <Quantity />
          </li>
          <li className="passenger px-3 py-2 flex justify-between">
            <div className="passenger-type flex items-center">
              <span className="passenger-icon inline-block mr-1">
                <Image src={BabyIcon} alt="Adult icon" className="w-8 h-8" />
              </span>
              <p className="passenger-text">
                <span className="title block">Em bé</span>
                <span className="sub-title text-gray-400 block text-sm">{`< 2 tuổi`}</span>
              </p>
            </div>
            <Quantity />
          </li>
        </ul>
      </div>
      <div className="box-bottom"></div>
    </div>
  );
};
export default memo(PassengerDropdown);
