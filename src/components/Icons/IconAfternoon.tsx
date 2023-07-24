import React, { memo } from "react";
const IconAfternoon: React.FC<{
  className?: string;
  width?: number;
  height?: number;
}> = ({ className = "", width = 22, height = 22 }) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      className={className}
      stroke="#1A202C"
    >
      <path
        d="M3 14.455h18M5.455 17.727h13.09M7.91 21h8.181M3.818 11.182C3.818 6.682 7.5 3 12 3s8.182 3.682 8.182 8.182"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      ></path>
    </svg>
  );
};
export default memo(IconAfternoon);
