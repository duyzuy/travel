import React, { memo } from "react";
const IconTicket: React.FC<{
  className?: string;
  width?: number;
  height?: number;
}> = ({ className = "", width = 22, height = 22 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id="Capa_1"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      width={width}
      height={height}
      className={className}
    >
      <g>
        <path
          style={{
            fill: "none",
            stroke: "#000000",
            strokeWidth: 22,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 10,
          }}
          d="&#10;&#9;&#9;M470.375,317.25c0-16.914,13.711-30.625,30.625-30.625v-61.25c-16.914,0-30.625-13.711-30.625-30.625s13.711-30.625,30.625-30.625&#10;&#9;&#9;v-61.25H11v61.25c16.914,0,30.625,13.711,30.625,30.625S27.914,225.375,11,225.375v61.25c16.914,0,30.625,13.711,30.625,30.625&#10;&#9;&#9;S27.914,347.875,11,347.875v61.25h490v-61.25C484.086,347.875,470.375,334.164,470.375,317.25z"
        />

        <rect
          x="240.688"
          y="164.125"
          style={{
            fill: "none",
            stroke: "#33CCCC",
            strokeWidth: 22,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 10,
          }}
          width="168.438"
          height="61.25"
        />

        <line
          style={{
            fill: "none",
            stroke: "#000000",
            strokeWidth: 22,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 10,
          }}
          x1="225.375"
          y1="286.625"
          x2="424.438"
          y2="286.625"
        />

        <line
          style={{
            fill: "none",
            stroke: "#000000",
            strokeWidth: 22,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 10,
          }}
          x1="225.375"
          y1="347.875"
          x2="424.438"
          y2="347.875"
        />

        <line
          style={{
            fill: "none",
            stroke: "#33CCCC",
            strokeWidth: 22,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 10,
          }}
          x1="133.5"
          y1="141.667"
          x2="133.5"
          y2="172.292"
        />

        <line
          style={{
            fill: "none",
            stroke: "#33CCCC",
            strokeWidth: 22,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 10,
          }}
          x1="133.5"
          y1="207"
          x2="133.5"
          y2="237.625"
        />

        <line
          style={{
            fill: "none",
            stroke: "#33CCCC",
            strokeWidth: 22,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 10,
          }}
          x1="133.5"
          y1="273.354"
          x2="133.5"
          y2="303.979"
        />

        <line
          style={{
            fill: "none",
            stroke: "#33CCCC",
            strokeWidth: 22,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 10,
          }}
          x1="133.5"
          y1="339.708"
          x2="133.5"
          y2="370.333"
        />
      </g>
    </svg>
  );
};
export default memo(IconTicket);
