"use client";

import React, { memo } from "react";
import Image from "next/image";
import aircraftWing from "@/assets/images/aircraft-wing.svg";
const AirCraftWings: React.FC<{ width?: number; height?: number }> = ({
  width = 1000,
  height = 600,
}) => {
  return (
    <div className="wings opacity-30 pointer-events-none">
      <div
        className="wing-left absolute"
        style={{
          width: width,
          height: height,
          left: `calc(-${width}px - 1rem)`,
        }}
      >
        <Image
          src={aircraftWing}
          alt="aircraft wing left"
          style={{
            transform: "rotateY(180deg)",
            objectPosition: "top center",
            objectFit: "cover",
          }}
          fill
        />
      </div>
      <div
        className="wing-right absolute right-0"
        style={{
          width: width,
          height: height,
          right: `calc(-${width}px - 1rem)`,
        }}
      >
        <Image
          src={aircraftWing}
          alt="aircraft wing right"
          fill
          style={{
            objectPosition: "top center",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};
export default memo(AirCraftWings);
