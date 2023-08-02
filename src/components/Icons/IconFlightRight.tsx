import React, { memo } from "react";
const IconFlightRight: React.FC<{
  className?: string;
  width?: number;
  height?: number;
  stroke?: string;
}> = ({ className = "", width = 22, height = 22, stroke = "#333333" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke={stroke}
    >
      <path
        d="M21.6248 6.19798C21.3528 5.34725 20.4388 4.84842 19.5851 5.11094L15.5216 6.39455L10.8218 4.24067C9.26829 3.54062 7.55078 3.40663 5.91237 3.87464L10.9272 7.84587L6.88042 9.12418L6.09042 8.62641C4.9818 7.96613 3.61598 7.79128 2.40051 8.2246L4.19609 10.5021C5.31502 11.9105 7.18761 12.4813 8.90192 11.9366L20.5687 8.24698C21.4262 7.97283 21.899 7.05544 21.6248 6.19798Z"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.17712 21.1738H22.119"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default memo(IconFlightRight);
