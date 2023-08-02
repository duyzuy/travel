"use client";

import Select from "@/components/Select";
import Input from "@/components/Input";
const PassengerContact = () => {
  return (
    <>
      <div className="passenger-contact-form">
        <div className="flex items-center mb-4">
          <div className="w-28">
            <Select
              value={{ id: 1, name: "Ông", value: "Mr" }}
              name="title"
              label="Danh xưng"
              required
            />
          </div>
          <div className="flex items-center flex-1 ml-4">
            <Input
              value=""
              name="firstName"
              label="Họ"
              floating={false}
              textSize="sm"
              required
              onChange={() => {}}
            />
            <Input
              value=""
              name="lastName"
              label="Tên đệm và tên"
              floating={false}
              textSize="sm"
              required
              onChange={() => {}}
              className="ml-4"
            />
          </div>
        </div>
        <div className="flex items-center">
          <Input
            value=""
            name="email"
            label="Email"
            floating={false}
            textSize="sm"
            required
            placeholder="Ví dụ: love@gmail.com"
            onChange={() => {}}
          />
          <Input
            value=""
            name="phoneNumber"
            label="Số điện thoại"
            floating={false}
            textSize="sm"
            required
            onChange={() => {}}
            className="ml-4"
          />
        </div>
      </div>
    </>
  );
};
export default PassengerContact;
