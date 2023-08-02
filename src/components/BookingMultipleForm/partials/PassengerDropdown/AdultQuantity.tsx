"use client";
import React, { memo } from "react";
import { PaxType } from "@/constants/enum";
import Image from "next/image";
import { AdultIcon } from "@/assets/icons";
import Quantity from "@/components/Quantity";
const AdultQuantity: React.FC<{
  title: string;
  subTitle: string;
  value: number;
  onChange: (
    paxType: PaxType,
    { action, value }: { action: "minus" | "plus"; value: number }
  ) => void;
}> = ({ title, subTitle, onChange, value }) => {
  return (
    <>
      <div className="passenger-type flex items-center">
        <span className="passenger-icon inline-block mr-1">
          <Image src={AdultIcon} alt="Adult icon" className="w-8 h-8" />
        </span>
        <p className="passenger-text">
          <span className="title block">{title}</span>
          <span className="sub-title block text-gray-400 text-sm">
            {subTitle}
          </span>
        </p>
      </div>
      <Quantity
        value={value}
        onChange={(data) => onChange(PaxType.ADULT, data)}
      />
    </>
  );
};
export default memo(AdultQuantity);
