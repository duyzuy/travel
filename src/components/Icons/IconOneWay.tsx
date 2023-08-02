import React, { memo } from "react";
const IconOneWay: React.FC<{
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
}> = ({ className = "", width = 22, height = 22, fill = "back" }) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      className={className}
      viewBox="0 0 24 24"
    >
      <path d="M19 15H5C4.4 15 4 14.6 4 14C4 13.4 4.4 13 5 13H16.6L14.3 10.7C13.9 10.3 13.9 9.7 14.3 9.3C14.7 8.9 15.3 8.9 15.7 9.3L19.7 13.3C20 13.6 20.1 14 19.9 14.4C19.8 14.8 19.4 15 19 15Z" />
    </svg>
  );
};
export default memo(IconOneWay);
