"use client";

import React, { memo } from "react";
import Select from "@/components/base/Select";
import Input from "@/components/base/Input";
import { PaxType } from "@/constants/enum";
import IconInfant from "@/components/Icons/IconInfant";
import IconAdult from "@/components/Icons/IconAdult";
import IconChildren from "@/components/Icons/IconChildren";
const PassengerInformation: React.FC<{
  paxType: PaxType;
}> = ({ paxType }) => {
  return (
    <div className="pax-infor mb-6">
      <div className="pax-head mb-4 flex items-center">
        <span className="mr-2">
          {(paxType === PaxType.ADULT && (
            <IconAdult width={24} height={24} />
          )) ||
            (paxType === PaxType.CHILDREN && (
              <IconChildren width={24} height={24} />
            )) || <IconInfant width={24} height={24} />}
        </span>
        <span className="text-lg ">
          {(paxType === PaxType.ADULT && "Người lớn") ||
            (paxType === PaxType.CHILDREN && "Trẻ em") ||
            "Em bé"}
        </span>
      </div>
      <div className="flex items-center mb-4">
        <div className="pax-select-title w-28">
          <Select
            name="sex"
            label="Danh xưng"
            required
            value={{ id: 1, name: "Ông", value: "Mr" }}
          />
        </div>
        <div className="flex items-center flex-1 ml-4">
          <Input
            name="firstName"
            label="Họ"
            required
            textSize="sm"
            placeholder="Ví dụ: NGUYEN"
            value=""
            onChange={() => {}}
            floating={false}
          />
          <Input
            name="lastName"
            label="Tên đệm và tên"
            value=""
            required
            textSize="sm"
            placeholder="Ví dụ: VAN A"
            floating={false}
            onChange={() => {}}
            className="ml-4"
          />
        </div>
      </div>
      <div className="w-72">
        <Input
          name="birthDay"
          label="Ngày sinh"
          value=""
          required
          textSize="sm"
          placeholder="MM-DD-YYYY"
          floating={false}
          onChange={() => {}}
        />
        {paxType === PaxType.CHILDREN && (
          <p className="text-xs text-gray-800 mt-2">
            Hành khách trẻ em (từ 2 - 11 tuổi)
          </p>
        )}
        {paxType === PaxType.INFANT && (
          <p className="text-xs text-gray-800 mt-2">
            Hành khách trẻ sơ sinh (dưới 2 tuổi)
          </p>
        )}
      </div>
    </div>
  );
};
export default memo(PassengerInformation);
