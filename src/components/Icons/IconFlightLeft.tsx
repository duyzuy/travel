import React, { memo } from "react";
const IconFlightLeft: React.FC<{
  className?: string;
  width?: number;
  height?: number;
}> = ({ className = "", width = 22, height = 22 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <path
        d="M2.89483 6.19798C3.16685 5.34725 4.08087 4.84842 4.93456 5.11094L8.99809 6.39455L13.6979 4.24067C15.2514 3.54062 16.9689 3.40663 18.6073 3.87464L13.5925 7.84587L17.6392 9.12418L18.4292 8.62641C19.5379 7.96613 20.9037 7.79128 22.1191 8.2246L20.3236 10.5021C19.2046 11.9105 17.332 12.4813 15.6177 11.9366L3.951 8.24698C3.09349 7.97283 2.62064 7.05544 2.89483 6.19798Z"
        stroke="#333333"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.3425 21.1738H2.40062"
        stroke="#333333"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export default memo(IconFlightLeft);
