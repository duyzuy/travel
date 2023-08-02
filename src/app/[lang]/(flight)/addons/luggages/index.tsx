"use client";
import React, { memo, useState } from "react";
import Image from "next/image";
import LuggageIcon from "@/assets/icons/suitcase.svg";

import { showLuggageVar } from "@/cache/vars";
import { useModal } from "@/hooks/useModal";
const Luggages: React.FC = () => {
  const { onShowModal } = useModal(showLuggageVar);

  return (
    <>
      <div className="luggages-addon bg-white rounded-sm shadow-sm">
        <div className="box-head flex items-center px-6 py-4">
          <div className="addon-icon mr-4">
            <Image src={LuggageIcon} width={40} height={40} alt="luggage" />
          </div>
          <div className="luggages-content flex-1 flex items-center justify-between">
            <div className="text flex-1">
              <p className="text-lg">Thêm hành lý ký gửi</p>
              <p className="text-sm text-gray-600">
                Thêm hành lý để thuận tiện hơn cho chuyến đi. Mua bây giờ rẻ hơn
                tại quầy
              </p>
            </div>
            <button className="add-on-fc cursor-pointer" onClick={onShowModal}>
              <span className="block">
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
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(Luggages);
