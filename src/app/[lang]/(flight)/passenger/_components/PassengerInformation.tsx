"use client";

import React, { memo, useEffect, useMemo } from "react";

import { FlightBookingInformation } from "@/modules/bookingTicket/bookingInformation.interface";
import PassengerForm from "./PassengerForm";
import { GENDER, PASSENGER_TITLE, PASSENGER_TYPE } from "@/constants/enum";
import {
  IPassengerInformationFormValue,
  PassengerInformationStore,
} from "@/modules/passengerInformation/passengerInformation.interface";

type BookingInfoType = FlightBookingInformation["bookingInfo"];
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
type BookingInforWithPassengersRequired = WithRequired<
  BookingInfoType,
  "passengers"
>;

const createPassengersRecord = (num: number, passengerType: PASSENGER_TYPE) => {
  let passengers: PassengerInformationStore["passengers"] = [];
  Array.from({ length: num }).map((index) => {
    passengers.push({
      title: PASSENGER_TITLE.MR,
      firstName: "",
      lastName: "",
      dependent: null,
      gender: GENDER.MALE,
      birthDate: undefined,
      isContact: false,
      type: passengerType,
    });
  });

  return passengers;
};
const PassengerInformation: React.FC<{
  person: BookingInforWithPassengersRequired["passengers"];
  passengers: IPassengerInformationFormValue["passengers"];
  onAddPassengers: (data: IPassengerInformationFormValue["passengers"]) => void;
}> = ({ person, onAddPassengers, passengers }) => {
  //init records Data
  const passengerInitRecords = useMemo(() => {
    let result: PassengerInformationStore["passengers"] = [];
    Object.keys(person).forEach((paxKey) => {
      result = [
        ...result,
        ...createPassengersRecord(
          person[paxKey as PASSENGER_TYPE].amount,
          paxKey as PASSENGER_TYPE
        ),
      ];
    });

    return result;
  }, [person]);

  const onChangeInformation = (
    index: number,
    formData: PassengerInformationStore["passengers"][0]
  ) => {
    const newPassengers = passengers.splice(index, 1, { ...formData });
    onAddPassengers(newPassengers);
  };
  useEffect(() => {
    onAddPassengers(passengerInitRecords);
  }, []);
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
          {passengerInitRecords.map((pax, _index) => (
            <PassengerForm
              key={_index}
              passengerInfo={pax}
              paxType={pax.type}
              index={_index}
              onChangeForm={(formData) => onChangeInformation(_index, formData)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default memo(PassengerInformation);
