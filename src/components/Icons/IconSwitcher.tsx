import React, { memo } from "react";
const IconSwitcher: React.FC<{
  className?: string;
  width?: number;
  height?: number;
  stroke?: string;
}> = ({ className = "", width = 22, height = 22, stroke = "#333333" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      width={width}
      className={className}
    >
      <g>
        <path
          d="M16 13.9753L13.4979 16.4774L13.4979 8M8 10.5021L10.5021 8L10.5021 16.4774"
          stroke={stroke}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
export default memo(IconSwitcher);
