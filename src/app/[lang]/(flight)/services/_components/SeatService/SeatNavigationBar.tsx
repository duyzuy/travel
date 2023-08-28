"use client";
import React, { memo } from "react";
import NavigationBarAddon from "@/components/NavigationBarAddon";

interface ISeatNavigationBar {
  onFinish: () => void;
}
const SeatNavigationBar: React.FC<ISeatNavigationBar> = (props) => {
  const { onFinish } = props;
  return (
    <NavigationBarAddon
      className="sticky bottom-0 bg-white z-20 h-20"
      onClick={onFinish}
      addOn="seats"
    />
  );
};
export default memo(SeatNavigationBar);
