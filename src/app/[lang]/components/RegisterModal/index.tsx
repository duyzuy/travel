"use client";

import React, { memo } from "react";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import IconFacebook from "@/components/Icons/IconFacebook";
import IconGoogle from "@/components/Icons/IconGoogle";
import Button from "@/components/Button";
import styles from "./register-modal.module.scss";
import {
  isShowLoginModalVar,
  isShowRegisterModalVar,
} from "@/cache/vars/profile";
import { useModal } from "@/hooks/useModal";
import { useReactiveVar } from "@apollo/client";
const RegisterModal: React.FC = () => {
  const isShowModalRegister = useReactiveVar(isShowRegisterModalVar);
  const { onCloseModal: onCloseRegisterModal } = useModal(
    isShowRegisterModalVar
  );
  const { onShowModal: onShowLoginModal } = useModal(isShowLoginModalVar);

  const onSwitchModal = () => {
    onCloseRegisterModal();
    onShowLoginModal();
  };
  const RegisterForm = () => {
    return (
      <div className={styles.wrapper}>
        <div className="head-form mb-6">
          <h3 className="text-3xl">Đăng ký!</h3>
          <p className="text-gray-600 py-3">
            Đã có tài khoản?{" "}
            <span
              className="text-emerald-600 cursor-pointer"
              onClick={onSwitchModal}
            >
              đăng nhập ngay!
            </span>
          </p>
        </div>

        <form>
          <div className="inputs">
            <Input
              name="email"
              label="Email"
              className="mb-6"
              value=""
              required
              floating={false}
              placeholder="Nhập địa chỉ email"
              onChange={() => {}}
            />
            <Input
              name="password"
              label="Password"
              placeholder="Nhập mật khẩu"
              value=""
              required
              onChange={() => {}}
              floating={false}
            />
          </div>
          <div className="py-10 gap-or relative">
            <p className="absolute text-or text-gray-500">hoặc</p>
            <hr />
          </div>
          <div className="social-login block mb-12">
            <div className="flex items-center justify-center">
              <div className="social-item mr-3 text-center w-20">
                <span className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2">
                  <IconFacebook width={30} height={30} />
                </span>
                <span className="text-sm text-gray-600">Facebook</span>
              </div>
              <div className="social-item text-center w-20">
                <span className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2">
                  <IconGoogle width={30} height={30} />
                </span>
                <span className="text-sm text-gray-600">Google</span>
              </div>
            </div>
          </div>

          <Button
            color="secondary"
            rounded="sm"
            fullWidth
            className="mb-3"
            size="lg"
          >
            Đăng ký
          </Button>
        </form>
      </div>
    );
  };

  return (
    <Modal
      // modalTitle="Đăng ký tài khoản"
      isOpen={isShowModalRegister}
      bodyContent={<RegisterForm />}
      onclose={() => onCloseRegisterModal()}
      // onCancel={() => {}}
      // onSubmit={() => {}}
    />
  );
};
export default memo(RegisterModal);
