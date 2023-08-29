"use client";

import React, { memo } from "react";

import PassengerForm from "./PassengerForm";
import { IPassengerInformationFormValue } from "@/modules/passengerInformation/passengerInformation.interface";

const PassengerInformation: React.FC<{
  passengers: IPassengerInformationFormValue["passengers"];
  onAddPassengers: (data: IPassengerInformationFormValue["passengers"]) => void;
}> = ({ onAddPassengers, passengers }) => {
  const onChangeInformation = (
    formData: IPassengerInformationFormValue["passengers"][0]
  ) => {
    let newPassengers = [...passengers];
    const _pIndex = passengers.findIndex((pax) => pax.index === formData.index);

    if (_pIndex !== -1) {
      newPassengers.splice(_pIndex, 1, { ...formData });
      onAddPassengers(newPassengers);
    }
  };

  return (
    <div className="box bg-white rounded-sm mb-6 p-6 shadow-sm">
      <div className="head-passenger mb-4">
        <h3 className="text-xl">
          <span className="line w-3 bg-emerald-400 block h-5 rounded-tr-xl rounded-br-xl -translate-x-6 translate-y-1 absolute"></span>
          Thông tin hành khách
        </h3>
        <p className="py-2 text-sm text-gray-500">
          Nhập tiếng Việt không dấu, họ tên trùng khớp trên giấy tờ tuỳ thân.
        </p>
      </div>
      <div className="line border-t py-2"></div>
      <div className="body-passenger">
        <div className="form">
          {passengers.map((pax) => (
            <PassengerForm
              key={pax.index}
              passengers={passengers}
              passengerInfo={pax}
              paxType={pax.type}
              onChangeForm={(formData) => onChangeInformation(formData)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default memo(PassengerInformation);
