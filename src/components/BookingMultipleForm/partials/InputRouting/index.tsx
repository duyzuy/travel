"use client";

import React, { memo, useState, useRef } from "react";
import Input from "@/components/Input";
import {
  AirCraftLeftIcon,
  AirCraftRightIcon,
  SwitcherIcon,
} from "@/assets/icons";
import Image from "next/image";
import { useClickOutSide } from "@/hooks/useClickOutSide";
import { QUERY_AIRPORT_LIST } from "@/app/components/BookingFormSearch/operations/queries";
import { useQuery } from "@apollo/client";
import styles from "./inputRouting.module.scss";
import { AirPortList } from "@/Models/airport";
import { LocationIcon } from "@/assets/icons";
const InputRouting: React.FC = () => {
  const { data } = useQuery<{ airportList: AirPortList }>(QUERY_AIRPORT_LIST);
  const [showDropdown, setShowdropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutSide(dropdownRef, () => {
    setShowdropdown(false);
  });

  return (
    <div className={styles.wrapper + " relative"}>
      <div className="flex w-full relative flex-wrap routing-input">
        <Input
          iconPath={AirCraftRightIcon}
          showLabel={false}
          placeholder="Điểm đi"
          label="Điểm đi"
          name="from"
          onClick={() => setShowdropdown(true)}
          value="Tp Hồ Chí Minh - SGN"
        />
        <button type="button" className="absolute rotate-90 switcher z-10">
          <Image src={SwitcherIcon} alt="switcher" width={24} height={24} />
        </button>
        <Input
          iconPath={LocationIcon}
          showLabel={false}
          placeholder="Điểm đến"
          label="Điểm đến"
          name="to"
          onClick={() => setShowdropdown(true)}
        />
      </div>
      {(showDropdown && (
        <div
          className={
            styles.airportList + " shadow-md border border-gray-300 absolute"
          }
          ref={dropdownRef}
        >
          <div className="wrapper ">
            <ul className="airport-list-item">
              {data &&
                data.airportList.map((item) => (
                  <li
                    className="item flex items-center justify-between px-4 py-2 bg-white hover:bg-gray-100 cursor-pointer"
                    key={item.id}
                  >
                    <p className="airport-city-name">
                      <span className="city block">
                        {item.province.provinceName}
                      </span>
                      <span className="airport block text-sm text-gray-500">
                        {item.name}
                      </span>
                    </p>
                    <span className="airport-code font-bold">{item.code}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )) || <></>}
    </div>
  );
};
export default memo(InputRouting);
