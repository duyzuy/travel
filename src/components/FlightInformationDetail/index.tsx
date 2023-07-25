"use client";
import React, { memo } from "react";

import { VJBrandOneIcon } from "@/assets/icons";
import Image from "next/image";

type PropsType = {
  isOpen: boolean;
};
export type FlightInformationRefType = {
  getHeight: () => number;
};

const FlightInformationDetail: React.FC<PropsType> = ({ isOpen = false }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="flight-item-detail border-t bg-white">
      <div className="flight-item-info relative  p-6">
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
                    <span className="relative w-6 h-6 mr-2">
                      <Image src={VJBrandOneIcon} alt="vietjet" />
                    </span>
                    <p className="inline-block text-sm">Vietjet Air</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <span>2h 50m</span>
                    <span className="space mx-2">|</span>
                    <span>VJ-167</span>
                    <span className="space mx-2">|</span>
                    <span>Airbus A320</span>
                  </p>
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
  );
};

export default memo(FlightInformationDetail);
