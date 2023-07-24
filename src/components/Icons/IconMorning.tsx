import React, { memo } from "react";
const IconMorning: React.FC<{
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
        d="M6.664 13.29c-.328-.654-.573-1.472-.573-2.29C6.09 8.3 8.3 6.09 11 6.09c2.7 0 4.909 2.21 4.909 4.91 0 1.145-.41 2.209-1.064 3.027M2 11h.818M4.618 4.618l.573.573M11 2v.818M17.382 4.618l-.573.573M20 11h-.818"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      ></path>
      <path
        d="M5.273 20A3.282 3.282 0 012 16.727c0-1.8 1.473-3.273 3.273-3.273.409 0 .818.082 1.227.246.736-1.554 2.29-2.7 4.09-2.7 1.965 0 3.683 1.31 4.255 3.027.573-.409 1.146-.572 1.882-.572 1.8 0 3.273 1.472 3.273 3.272 0 1.8-1.473 3.273-3.273 3.273H5.273z"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      ></path>
    </svg>
  );
};
export default memo(IconMorning);
