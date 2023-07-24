"use client";

import React, { memo, useCallback, useRef } from "react";
import { JsxElement } from "typescript";
import styles from "./modal.module.scss";
import Button from "../Button";
interface ModalPropType {
  isOpen?: boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
  headlineTile?: string;
  children?: React.ReactNode;
  bodyContent?: React.ReactNode;
  cancelButtonText?: string;
  submitButtonText?: string;
  modalTitle?: string;
}
const Modal: React.FC<ModalPropType> = ({
  isOpen = true,
  onCancel,
  onSubmit,
  cancelButtonText,
  submitButtonText,
  bodyContent,
  children,
  headlineTile,
  modalTitle = "modal",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  if (!isOpen) {
    return null;
  }

  const handleCloseModal = () => {
    onclose && onclose;
  };
  return (
    <div
      className={styles.wrapper + " modal fixed left-0 right-0 top-0 bottom-0"}
      ref={modalRef}
    >
      <div
        className="modal-overlay absolute w-full h-full bg-slate-950 opacity-50"
        onClick={handleCloseModal}
      ></div>
      <div className="modal-wrapp w-full h-screen flex items-center justify-center px-2">
        <div className="bg-white rounded-sm w-full sm:max-w-xl relative z-10">
          <div className="modal-head p-6 border-b relative flex items-center justify-center">
            {(modalTitle && (
              <h6 className="text-cetner text-xl">{modalTitle}</h6>
            )) || <></>}
            <span
              className="icon absolute right-3 top-5 cursor-pointer"
              onClick={handleCloseModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          <div className="modal-body p-6">{bodyContent}</div>
          <div className="modal-footer p-6 border-t flex items-center justify-center">
            <div className="block w-1/2">
              <Button variant="outline" fullWidth>
                huy bo
              </Button>
            </div>
            <div className="ml-2 block w-1/2">
              <Button className="ml-2" fullWidth>
                {(submitButtonText && submitButtonText) || "Xác nhận"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Modal);
