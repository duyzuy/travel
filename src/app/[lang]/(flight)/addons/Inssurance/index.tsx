"use client";
import React, { memo, useState } from "react";
import Image from "next/image";
import LuggageIcon from "@/assets/icons/suitcase.svg";
import classNames from "classnames";
import { formatCurrencyVND } from "@/utils/helper";
import IconFlightRight from "@/components/Icons/IconFlightRight";
import IconInssurance from "@/assets/icons/ico-insurance.svg";
import IconSafty from "@/assets/icons/ico-safety.svg";

import Checkbox from "@/components/base/Checkbox";
import IconChubb from "@/components/Icons/IconChubb";

const Inssurance: React.FC = () => {
  return (
    <>
      <div className="baggage-addon bg-white rounded-sm shadow-sm">
        <div className="box-inner">
          <div className="box-top px-6 py-4 flex items-center">
            <div className="addon-icon mr-4">
              <Image src={IconSafty} width={40} height={40} alt="luggage" />
            </div>
            <div className="box-text">
              <p className="text-lg">Mua Bảo hiểm</p>
              <p className="text-sm text-gray-600">
                An tâm và thoải mái với chương trình bảo hiểm du lịch uy tín cho
                chuyến đi!
              </p>
            </div>
          </div>
          <div className="line border-t"></div>
          <div className="add-on-content px-6 py-4">
            <div className="box">
              <div className="inner-box">
                <div className="flex items-center justify-between py-4">
                  <button className="add-on-fc cursor-pointer flex items-center">
                    <span className="block mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#33d399"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-sm">Thêm bảo hiểm</span>
                  </button>
                  <p className="price text-sm">45.000 VND/người/chặng</p>
                </div>
                <div className="box-content text-sm text-gray-600">
                  <p>Quyền lợi bảo hiểm tai nạn cá nhân.</p>
                  <p>
                    Quyền lợi bảo hiểm cho những trở ngại phát sinh trong chuyến
                    đi gồm hủy, hoãn chuyến bay
                  </p>
                  <p>Dịch vụ trợ giúp y tế toàn cầu 24 giờ</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="box-bottom px-6 pb-4">
          <div className="flex items-center">
            <span className="mr-2">
              <IconChubb width={100} />
            </span>
            <p className="text-sm text-gray-500 flex items-center">
              <span className="mr-2">Được cung cấp bởi Chubb Việt nam</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 fill-sky-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(Inssurance);
