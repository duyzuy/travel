import React, { memo } from "react";
const IconRoundTrip: React.FC<{
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
      <path
        d="M21 11H7C6.4 11 6 10.6 6 10C6 9.4 6.4 9 7 9H18.6L16.3 6.7C15.9 6.3 15.9 5.7 16.3 5.3C16.7 4.9 17.3 4.9 17.7 5.3L21.7 9.3C22 9.6 22.1 10 21.9 10.4C21.8 10.8 21.4 11 21 11Z"
        fill="black"
      />
      <path
        d="M7.00015 19C6.70015 19 6.50015 18.9 6.30015 18.7L2.30015 14.7C2.00015 14.4 1.90015 14 2.10015 13.6C2.30015 13.2 2.60015 13 3.00015 13H17.0001C17.6001 13 18.0001 13.4 18.0001 14C18.0001 14.6 17.6001 15 17.0001 15H5.40015L7.70015 17.3C8.10015 17.7 8.10015 18.3 7.70015 18.7C7.50015 18.9 7.30015 19 7.00015 19Z"
        fill="black"
      />
    </svg>
  );
};
export default memo(IconRoundTrip);
