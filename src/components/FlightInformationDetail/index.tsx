"use client";
import React, { memo } from "react";

import { VJBrandOneIcon } from "@/assets/icons";
import Image from "next/image";
import IconLuggage from "../Icons/IconLuggage";
const FlightInformationDetail: React.FC<{
  isOpen?: boolean;
}> = ({ isOpen = false }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="flight-item-detail border-t p-6">
        <div className="flight-item-info relative">
          <div className="info py-6">
            <ul className="flex items-center">
              <li className="w-20 mr-10">
                <span className="detail-time block">22:25</span>
                <span className="detail-date block text-gray-600 text-sm">
                  25 thg 7
                </span>
              </li>
              <li className="flex-1">
                <span className="block">Hà Nội (HAN)</span>
                <span className="block text-gray-500 text-sm">
                  Sân bay Nội Bài
                </span>
              </li>
            </ul>
            <div className="flex items-center">
              <div className="duration w-20 mr-10">
                <span className="text-sm text-gray-400">2h 15m</span>
              </div>
              <div className="py-6 flex-1">
                <div className="flex items-center">
                  <div className="flex-1">
                    <div className="brand-name flex items-center">
                      <p className="mr-2">Vietjet Air</p>
                      <span className="relative w-8 h-6">
                        <Image
                          src={VJBrandOneIcon}
                          alt="vietjet"
                          fill
                          objectFit="contain"
                        />
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <span>VJ-167</span>
                      <span className="space mx-2">|</span>
                      <span>Airbus A320</span>
                      <span className="space mx-2">|</span>
                      <span>2h 50m</span>
                    </p>
                    {/* <div className="benefit flex">
                      <IconLuggage width={24} height={24} className="mr-2" />
                      <ul className="list text-sm text-gray-600">
                        <li>Hành lý xách tay 7 kg</li>
                        <li>Hành lý Hành lý ký gửi 20kg</li>
                      </ul>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <ul className="flex items-center">
              <li className="w-20 mr-10">
                <span className="detail-time block">21:25</span>
                <span className="detail-date block text-gray-600 text-sm">
                  25 thg 7
                </span>
              </li>
              <li>
                <span className="block">Tp. Hồ Chí Minh (SGN)</span>
                <span className="text-gray-500 text-sm">
                  Sân bay tân sơn nhất
                </span>
              </li>
            </ul>
          </div>
          <div className="line-bar absolute top-8 bottom-12 flex flex-col items-center justify-between pointer-events-none left-20">
            <span className="start w-2 h-2 rounded-full border border-emerald-600 block"></span>
            <span className="start border-l h-full border-slate-200 block"></span>
            <span className="start w-2 h-2 rounded-full bg-emerald-500 block"></span>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(FlightInformationDetail);
