"use client";

import React, { memo } from "react";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
const RegisterModal = () => {
  const RegisterForm = () => {
    return (
      <>
        <Input name="email" label="Email" className="mb-3" value="" required />
        <Input name="password" label="Password" value="" required />
      </>
    );
  };

  return (
    <Modal modalTitle="Đăng ký tài khoản" bodyContent={<RegisterForm />} />
  );
};
export default memo(RegisterModal);
