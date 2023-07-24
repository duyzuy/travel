import React, { memo } from "react";
const IconEarlyMorning: React.FC<{
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
        d="M2 13h.91M4.91 5.91l.636.635M12 3v.91M19.091 5.91l-.636.635M22 13h-.909M6.546 13C6.546 10 9 7.546 12 7.546c3 0 5.455 2.454 5.455 5.454M2 16.636h20M4.727 20.273h14.546"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      ></path>
    </svg>
  );
};
export default memo(IconEarlyMorning);
