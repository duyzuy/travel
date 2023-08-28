"use client";
import Select from "@/components/base/Select";
import IconAdult from "@/components/Icons/IconAdult";
import IconChildren from "@/components/Icons/IconChildren";
import IconInfant from "@/components/Icons/IconInfant";
import Input from "@/components/base/Input";
import { GENDER, PASSENGER_TITLE, PASSENGER_TYPE } from "@/constants/enum";
import { PassengerInformationStore } from "@/modules/passengerInformation/passengerInformation.interface";
import { useMemo } from "react";
import { PASSENGER_TITLE_OPTIONS } from "@/constants/flight";
import InputBirthOfDay, { IValueBirthOfDay } from "./InputBirthOfDay";
import { startOfToday } from "date-fns";
import Checkbox from "@/components/base/Checkbox";
import classNames from "classnames";
type PassengerInfoType = PassengerInformationStore["passengers"][0];
type PassengerFormKey = keyof PassengerInfoType;
const BIRTH_DAY_FM = "DD-MM-YYYY";

interface IPassengerForm {
  paxType: PASSENGER_TYPE;
  passengerInfo: PassengerInfoType;
  onChangeForm: (formValue: PassengerInfoType) => void;
  index?: number;
}
const PassengerForm = ({
  paxType,
  passengerInfo,
  onChangeForm,
  index = 0,
}: IPassengerForm) => {
  const { firstName, lastName } = passengerInfo;

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

  const onSelectPassengerTitle = (value: string) => {
    onChangeForm({ ...passengerInfo, title: value as PASSENGER_TITLE });
  };
  const onChangePassengerTitle = (gender: GENDER) => {
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

  const renderFullName = useMemo(() => {
    let fullName: string = "";
    if (firstName.length || lastName.length) {
      fullName = firstName.toUpperCase().concat(", ", lastName.toUpperCase());
    } else {
      fullName = ` Hành khách ${index + 1}`;
    }
    return fullName;
  }, [firstName, lastName, index]);
  return (
    <div className="pax-infor mb-6">
      <div className="pax-head mb-4 flex items-center">
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
          <span className="text-xs text-emerald-500 ml-1">
            {(paxType === PASSENGER_TYPE.ADULT && "(Người lớn)") ||
              (paxType === PASSENGER_TYPE.CHILDREN && "(Trẻ em)") ||
              "Em bé"}
          </span>
        </p>
      </div>
      <div className="flex items-center">
        {passengerInfo.type === PASSENGER_TYPE.ADULT ? (
          <div className="pax-select-title w-28 mb-4">
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
            />
          </div>
        ) : null}

        <div
          className={classNames({
            "flex items-center flex-1": true,
            "ml-4": passengerInfo.type === PASSENGER_TYPE.ADULT,
          })}
        >
          <Input
            name="firstName"
            label="Họ"
            required
            textSize="sm"
            placeholder="NGUYEN"
            value={firstName.toUpperCase()}
            onChange={(evt) => onChange("firstName", evt.target.value)}
            className="w-1/2 mb-4"
            floating={false}
          />
          <Input
            name="lastName"
            label="Tên đệm và tên"
            value={lastName.toUpperCase()}
            required
            textSize="sm"
            placeholder="VAN A"
            floating={false}
            onChange={(evt) => onChange("lastName", evt.target.value)}
            className="ml-4 w-1/2 mb-4"
          />
        </div>
      </div>
      <div className="flex items-center">
        <InputBirthOfDay
          name="birthDate"
          label="Ngày sinh"
          // value={formData?.birthDate?.dateStr}
          required
          textSize="sm"
          placeholder={BIRTH_DAY_FM}
          onChange={onChangeBirthDay}
          className="w-1/2 mr-4"
        />
        {passengerInfo.type !== PASSENGER_TYPE.ADULT ? (
          <div className="gender w-1/2">
            <p className="text-sm mb-4 block">Giới tính</p>
            <div className="flex items-center text-sm">
              <Checkbox
                value={GENDER.FEMALE}
                isChecked={passengerInfo.gender === GENDER.FEMALE}
                label="Nam"
                className="mr-4"
                onChange={() => onChangePassengerTitle(GENDER.FEMALE)}
              />
              <Checkbox
                value={GENDER.MALE}
                isChecked={passengerInfo.gender === GENDER.MALE}
                label="Nữ"
                onChange={() => onChangePassengerTitle(GENDER.MALE)}
              />
            </div>
          </div>
        ) : (
          <div className="empty w-1/2"></div>
        )}
      </div>

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
  );
};
export default PassengerForm;
