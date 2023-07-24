import React, { memo } from "react";
const IconNight: React.FC<{
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
        d="M16.91 15.273c-4.5 0-8.183-3.682-8.183-8.182v0c0-.912-.88-1.77-1.671-1.316A8.099 8.099 0 003 12.818C3 17.318 6.682 21 11.182 21a8.099 8.099 0 007.043-4.055c.454-.792-.404-1.672-1.316-1.672v0zM14.455 3v3.273M12.818 4.636h3.273M19.364 7.91v3.272M17.727 9.545H21"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      ></path>
    </svg>
  );
};
export default memo(IconNight);
