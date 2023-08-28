"use client";
import React, { memo } from "react";
import Image, { StaticImageData } from "next/image";

interface IServiceItem {
  label: string;
  description: string;
  onClick?: () => void;
  thumbnail?: string | StaticImageData;
  children?: React.ReactNode;
  selectedItems?: React.ReactNode;
}
const ServiceItem = (props: IServiceItem) => {
  const { label, description, onClick, thumbnail, children, selectedItems } =
    props;
  return (
    <div className="service-item bg-white rounded-sm shadow-sm">
      <div className="box-head flex items-center px-6 py-4">
        {thumbnail ? (
          <div className="addon-icon mr-4">
            <Image src={thumbnail} width={40} height={40} alt="luggage" />
          </div>
        ) : null}
        <div className="service-content flex-1">
          <div className="service-top flex-1 flex items-center justify-between">
            <div className="text">
              <p className="text-lg">{label}</p>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
            {onClick ? <ServiceItem.ButtonAdd onClick={onClick} /> : null}
          </div>
          {selectedItems}
        </div>
      </div>
      {children && children}
    </div>
  );
};
export default memo(ServiceItem);

ServiceItem.Selected = function ServiceSelected() {
  return (
    <>
      <div className="selected">
        <div className="segment">
          <p className="flex items-center">
            <span>SGN</span>
            <span>-</span>
            <span>HAN</span>
          </p>
        </div>
      </div>
    </>
  );
};

ServiceItem.ButtonAdd = function ServiceItemButtonAdd({
  onClick,
  buttonText,
}: {
  onClick: () => void;
  buttonText?: string;
}) {
  return (
    <button className="add-on-fc cursor-pointer" onClick={onClick}>
      <span className="block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#33d399"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      {buttonText ? <span>{buttonText}</span> : null}
    </button>
  );
};
