"use client";

import Select from "@/components/base/Select";
import Input from "@/components/base/Input";
import { PASSENGER_TITLE_OPTIONS } from "@/constants/flight";
import { IPassengerInformationFormValue } from "@/modules/passengerInformation/passengerInformation.interface";
import { useState } from "react";
import { GENDER, PASSENGER_TITLE } from "@/constants/enum";
type ContactInformationType = Omit<
  IPassengerInformationFormValue,
  "passengers"
>;
interface IContactInformation {
  onAddContact?: (
    contactData: Omit<IPassengerInformationFormValue, "passengers">
  ) => void;
  contactInformation?: ContactInformationType;
}
const ContactInformation: React.FC<IContactInformation> = ({
  onAddContact,
  contactInformation,
}) => {
  const [formData, setFormData] = useState<ContactInformationType>({
    title: PASSENGER_TITLE.MR,
    contactFirstName: "",
    contactLastName: "",
    contactPhone: "",
    contactEmail: "",
    contactGender: GENDER.MALE,
  });

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
  const onChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const onSelectPassengerTitle = (value: string) => {
    setFormData((prev) => ({ ...prev, title: value as PASSENGER_TITLE }));
  };
  return (
    <>
      <div className="box pax-contact-infor bg-white rounded-sm p-6 shadow-sm">
        <div className="head-box mb-3">
          <h3 className="text-xl">
            <span className="line w-3 bg-emerald-400 block h-5 rounded-tr-xl rounded-br-xl -translate-x-6 translate-y-1 absolute"></span>
            Thông tin liên hệ
          </h3>
          <p className="py-2 text-sm text-gray-600">
            Mã đặt chỗ sẽ được gửi theo thông tin liên hệ dưới đây
          </p>
        </div>
        <div className="body-box">
          <div className="remind-login mb-6">
            <div className="flex items-center bg-emerald-50 px-3 py-2 rounded-lg">
              <span className="icon w-8 h-8 bg-emerald-400 flex items-center justify-center rounded-full mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="#ffff"
                >
                  <g>
                    <path d="m12 12.75a5.75 5.75 0 1 1 5.75-5.75 5.757 5.757 0 0 1 -5.75 5.75zm0-10a4.25 4.25 0 1 0 4.25 4.25 4.255 4.255 0 0 0 -4.25-4.25z" />
                    <path d="m16.6 22.75h-9.2a3.75 3.75 0 0 1 -3.721-4.215l.141-1.124a4.757 4.757 0 0 1 4.711-4.161h6.938a4.757 4.757 0 0 1 4.713 4.161l.141 1.124a3.75 3.75 0 0 1 -3.723 4.215zm-8.071-8a3.256 3.256 0 0 0 -3.223 2.85l-.14 1.124a2.249 2.249 0 0 0 2.234 2.526h9.2a2.249 2.249 0 0 0 2.232-2.529l-.14-1.124a3.256 3.256 0 0 0 -3.225-2.847z" />
                  </g>
                </svg>
              </span>
              <div className="remind-text">
                <p>
                  <span className="text-emerald-500">Đăng nhập</span> để lưu
                  lịch sử chuyến đi của bạn và tiến hành tích điểm đổi quà
                </p>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <div className="passenger-contact-form">
              <div className="flex items-center mb-4">
                <div className="w-28">
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
                      formData.title,
                      PASSENGER_TITLE_OPTIONS
                    )}
                    onSelect={(opt) => onSelectPassengerTitle(opt.value)}
                    textSize="sm"
                  />
                </div>
                <div className="flex items-center flex-1 ml-4">
                  <Input
                    value={formData.contactFirstName}
                    name="contactFirstName"
                    label="Họ"
                    floating={false}
                    textSize="sm"
                    required
                    onChange={(evt) =>
                      onChange("contactFirstName", evt.target.value)
                    }
                  />
                  <Input
                    value={formData.contactLastName}
                    name="contactLastName"
                    label="Tên đệm và tên"
                    floating={false}
                    textSize="sm"
                    required
                    onChange={(evt) =>
                      onChange("contactLastName", evt.target.value)
                    }
                    className="ml-4"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <Input
                  value={formData.contactEmail}
                  name="contactEmail"
                  label="Email"
                  floating={false}
                  textSize="sm"
                  required
                  placeholder="Ví dụ: love@gmail.com"
                  onChange={(evt) => onChange("contactEmail", evt.target.value)}
                />
                <Input
                  value={formData.contactPhone}
                  name="contactPhone"
                  label="Số điện thoại"
                  floating={false}
                  textSize="sm"
                  required
                  onChange={(evt) => onChange("contactPhone", evt.target.value)}
                  className="ml-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactInformation;
