"use client";

import React, { memo, useRef } from "react";
import classNames from "classnames";
import styles from "./modal.module.scss";
import Button from "../Button";
import { useClickOutSide } from "@/hooks/useClickOutSide";
import useAnimation from "@/hooks/useAnimation";

interface ModalPropType {
  isOpen?: boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
  bodyContent?: React.ReactNode;
  cancelButtonText?: string;
  submitButtonText?: string;
  modalTitle?: string;
  rounded?: "sm" | "md" | "lg" | "xl";
  onclose?: () => void;
  width?: "sm" | "md" | "lg" | "xl";
}
const Modal: React.FC<ModalPropType> = ({
  isOpen = false,
  onCancel,
  onSubmit,
  onclose,
  cancelButtonText = "Huỷ bỏ",
  submitButtonText = "Xác nhận",
  bodyContent,
  modalTitle,
  rounded = "sm",
  width = "lg",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutSide(modalRef, onclose);
  const { stage, isMounted } = useAnimation(isOpen);
  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={
        styles.wrapper +
        " modal fixed left-0 right-0 top-0 bottom-0 overflow-y-auto"
      }
    >
      <div className="modal-wrap w-full min-h-full flex items-center justify-center px-2">
        <div
          className={classNames({
            "bg-white w-full relative z-10 mx-auto overflow-auto transition-all":
              true,
            "rounded-sm": rounded === "sm",
            "rounded-md": rounded === "md",
            "rounded-lg": rounded === "lg",
            "rounded-xl": rounded === "xl",
            "sm:max-w-sm": width === "sm",
            "sm:max-w-md": width === "md",
            "sm:max-w-lg": width === "lg",
            "sm:max-w-xl": width === "xl",
            "opacity-0 translate-y-10": !stage,
            "opacity-100 translate-y-0": stage,
          })}
          ref={modalRef}
        >
          <span
            className="icon absolute right-3 top-5 cursor-pointer z-10"
            onClick={onclose}
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
          {modalTitle && (
            <div className="modal-head p-6 border-b relative flex items-center justify-center">
              {(modalTitle && (
                <h6 className="text-cetner text-xl">{modalTitle}</h6>
              )) || <></>}
            </div>
          )}
          <div className="modal-body p-6">{bodyContent}</div>
          {(onCancel || onSubmit) && (
            <div className="modal-footer p-6 border-t flex items-center justify-center">
              {onCancel && (
                <div className="block flex-1">
                  <Button
                    variant="outline"
                    fullWidth
                    color="secondary"
                    rounded="sm"
                  >
                    {cancelButtonText}
                  </Button>
                </div>
              )}
              {onSubmit && (
                <div className="ml-2 block flex-1">
                  <Button
                    className="ml-2"
                    fullWidth
                    color="secondary"
                    rounded="sm"
                  >
                    {(submitButtonText && submitButtonText) || "Xác nhận"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(Modal);
