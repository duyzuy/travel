"use client";

import React, { memo } from "react";
import classNames from "classnames";
import useAnimation from "@/hooks/useAnimation";
const Drawler: React.FC<{
  direction?: "left" | "right" | "bottom" | "top";
  width?: "xl" | "lg" | "md" | "sm";
  isOpen?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  hideCloseButton?: boolean;
}> = ({
  direction = "right",
  width = "md",
  isOpen = false,
  children,
  onClose,
  hideCloseButton,
}) => {
  const { stage, isMounted } = useAnimation(isOpen, 300);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="drawler fixed left-0 right-0 top-0 bottom-0 z-50">
      <div
        className={classNames({
          "overlay bg-gray-950 absolute w-full h-full transition-all": true,
          "opacity-60": stage,
          "opacity-0": !stage,
        })}
        onClick={onClose}
      ></div>
      <div
        className={classNames({
          "drawler-inner h-full relative z-20 flex justify-end pointer-events-none":
            true,
        })}
      >
        <div
          className={classNames({
            "bg-white h-full transition-all pointer-events-auto w-full": true,
            "translate-x-0": stage,
            "translate-x-144": !stage && width === "md",
            "max-w-144": width === "md",
            "translate-x-[650px]": !stage && width === "lg",
            "max-w-[650]": width === "lg",
            "translate-x-[850px]": !stage && width === "xl",
            "max-w-[850px]": width === "xl",
          })}
        >
          {!hideCloseButton ? (
            <span
              className="close w-8 h-8 flex items-center justify-center absolute right-2 top-2 cursor-pointer z-50"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          ) : null}
          <div className="drawler-body h-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default memo(Drawler);
