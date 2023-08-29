"use client";
import Select from "@/components/base/Select";
import IconAdult from "@/components/Icons/IconAdult";
import IconChildren from "@/components/Icons/IconChildren";
import IconInfant from "@/components/Icons/IconInfant";
import Input from "@/components/base/Input";
import { GENDER, PASSENGER_TITLE, PASSENGER_TYPE } from "@/constants/enum";
import { IPassengerInformationFormValue } from "@/modules/passengerInformation/passengerInformation.interface";
import { useMemo } from "react";
import { PASSENGER_TITLE_OPTIONS } from "@/constants/flight";
import InputBirthOfDay, { IValueBirthOfDay } from "./InputBirthOfDay";
import { startOfToday } from "date-fns";
import Checkbox from "@/components/base/Checkbox";

type PassengerInfoType = IPassengerInformationFormValue["passengers"][0];
type PassengerFormKey = keyof PassengerInfoType;
const BIRTH_DAY_FM = "DD-MM-YYYY";

interface IPassengerForm {
  paxType: PASSENGER_TYPE;
  passengerInfo: PassengerInfoType;
  onChangeForm: (formValue: PassengerInfoType) => void;
  passengers: IPassengerInformationFormValue["passengers"];
}
const PassengerForm = ({
  paxType,
  passengerInfo,
  onChangeForm,

  passengers,
}: IPassengerForm) => {
  const { firstName, lastName, index: _pIndex } = passengerInfo;

  const onChange = (key: PassengerFormKey, value: string) => {
    onChangeForm({
      ...passengerInfo,
      [key]: value.toLocaleLowerCase(),
    });
  };

  const onChangeBirthDay = (date: IValueBirthOfDay) => {
    const today = startOfToday();

    onChangeForm({
      ...passengerInfo,
      birthDate: {
        dateStr: date.value,
        date: new Date(Number(date.year), Number(date.month), Number(date.day)),
      },
    });
  };

  const passengerListForDependent = useMemo(() => {
    const initData: { id: number; name: string; value: string }[] = [];
    const paxFilter = passengers.reduce((acc, curr) => {
      if (curr.type === PASSENGER_TYPE.ADULT) {
        const fullName =
          curr.firstName !== "" && curr.lastName !== ""
            ? `${
                curr.title
              }. ${curr.lastName.toUpperCase()}, ${curr.firstName.toUpperCase()}`
            : `Người lớn ${curr.index + 1}`;

        acc = [
          ...acc,
          {
            id: curr.index,
            name: fullName,
            value: curr.index.toString(),
          },
        ];
      }
      return acc;
    }, initData);

    return paxFilter;
  }, [passengers]);
  const onSelectPassengerTitle = (value: string) => {
    onChangeForm({ ...passengerInfo, title: value as PASSENGER_TITLE });
  };
  const onChangeGender = (gender: GENDER) => {
    onChangeForm({ ...passengerInfo, gender: gender });
  };
  const getOptionFromValue = (
    value: PASSENGER_TITLE,
    options: typeof PASSENGER_TITLE_OPTIONS
  ) => {
    const optData = options.find((opt) => opt.value === value);

    if (!optData) {
      return;
    }
    return {
      id: optData.id,
      name: optData.nameVi,
      value: optData.value,
    };
  };

  const getOptionFormDependentList = (
    _pId: number,
    dependentList: { id: number; name: string; value: string }[]
  ) => {
    return dependentList.find((pax) => pax.id === _pId);
  };
  const onSelectDependent = (pax_index: string | number) => {
    if (typeof pax_index === "number") {
      onChangeForm({
        ...passengerInfo,
        dependent: { passenger: { index: pax_index } },
      });
    }
  };
  const renderFullName = useMemo(() => {
    let fullName: string = "";
    if (firstName.length || lastName.length) {
      fullName = lastName.toUpperCase().concat(", ", firstName.toUpperCase());
    } else {
      fullName = ` Hành khách ${_pIndex + 1}`;
    }
    return fullName;
  }, [firstName, lastName, _pIndex]);
  return (
    <div className="pax-infor mb-6">
      <div className="pax-head mb-4 flex items-center bg-gray-100 px-6 py-2 -mx-6">
        <span className="mr-2">
          {(paxType === PASSENGER_TYPE.ADULT && (
            <IconAdult width={24} height={24} />
          )) ||
            (paxType === PASSENGER_TYPE.CHILDREN && (
              <IconChildren width={24} height={24} />
            )) || <IconInfant width={24} height={24} />}
        </span>
        <p className="flex items-center">
          <span className="text-lg">{renderFullName}</span>
          <span className="text-xs text-emerald-600 ml-1">
            {(paxType === PASSENGER_TYPE.ADULT && "(Người lớn)") ||
              (paxType === PASSENGER_TYPE.CHILDREN && "(Trẻ em)") ||
              "(Em bé)"}
          </span>
        </p>
      </div>
      {passengerInfo.type === PASSENGER_TYPE.INFANT ? (
        <Select
          name="dependent"
          label="Bay cùng với"
          required
          options={passengerListForDependent.map((passenger) => ({
            id: passenger.id,
            name: passenger.name,
            value: passenger.value,
          }))}
          value={
            passengerInfo.dependent !== null
              ? getOptionFormDependentList(
                  passengerInfo.dependent?.passenger.index,
                  passengerListForDependent
                )
              : { id: "", name: "Chọn người bay cùng", value: "" }
          }
          onSelect={(opt) => onSelectDependent(opt.id)}
          textSize="sm"
          className="w-full mb-4"
        />
      ) : null}
      {passengerInfo.type === PASSENGER_TYPE.ADULT ? (
        <Select
          name="title"
          label="Danh xưng"
          required
          options={PASSENGER_TITLE_OPTIONS.map((item) => ({
            id: item.id,
            name: item.nameVi,
            value: item.value,
          }))}
          value={getOptionFromValue(
            passengerInfo.title,
            PASSENGER_TITLE_OPTIONS
          )}
          onSelect={(opt) => onSelectPassengerTitle(opt.value)}
          textSize="sm"
          className="w-24 mb-4"
        />
      ) : null}
      <div className="flex items-center">
        <Input
          name="lastName"
          label="Họ"
          value={lastName.toUpperCase()}
          required
          textSize="sm"
          placeholder="NGUYEN"
          floating={false}
          onChange={(evt) => onChange("lastName", evt.target.value)}
          className="w-1/2 mb-4"
        />

        <Input
          name="firstName"
          label="Tên đệm và tên"
          required
          textSize="sm"
          placeholder="VAN A"
          value={firstName.toUpperCase()}
          onChange={(evt) => onChange("firstName", evt.target.value)}
          className="w-1/2 mb-4 ml-4 "
          floating={false}
        />

        {paxType === PASSENGER_TYPE.ADULT ? (
          <InputBirthOfDay
            name="birthDate"
            label="Ngày sinh"
            // value={formData?.birthDate?.dateStr}
            required
            textSize="sm"
            placeholder={BIRTH_DAY_FM}
            onChange={onChangeBirthDay}
            className="w-1/2 ml-4 mb-4"
          />
        ) : null}
      </div>
      {paxType !== PASSENGER_TYPE.ADULT ? (
        <div className="flex">
          <div className="w-1/2">
            <InputBirthOfDay
              name="birthDate"
              label="Ngày sinh"
              // value={formData?.birthDate?.dateStr}
              required
              textSize="sm"
              placeholder={BIRTH_DAY_FM}
              onChange={onChangeBirthDay}
            />
            {paxType === PASSENGER_TYPE.CHILDREN ? (
              <p className="text-xs text-gray-800 mt-2">
                Hành khách trẻ em (từ 2 - 11 tuổi)
              </p>
            ) : null}
            {paxType === PASSENGER_TYPE.INFANT ? (
              <p className="text-xs text-gray-800 mt-2">
                Hành khách trẻ sơ sinh (dưới 2 tuổi)
              </p>
            ) : null}
          </div>
          <div className="gender w-1/2 ml-4">
            <p className="text-sm mb-2 block leading-6">Giới tính</p>
            <div className="flex items-center text-sm">
              <Checkbox
                value={GENDER.FEMALE}
                isChecked={passengerInfo.gender === GENDER.FEMALE}
                label="Nam"
                className="mr-4"
                onChange={() => onChangeGender(GENDER.FEMALE)}
              />
              <Checkbox
                value={GENDER.MALE}
                isChecked={passengerInfo.gender === GENDER.MALE}
                label="Nữ"
                onChange={() => onChangeGender(GENDER.MALE)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default PassengerForm;
