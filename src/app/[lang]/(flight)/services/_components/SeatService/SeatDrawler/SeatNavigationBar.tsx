"use client";
import React, { memo } from "react";
import NavigationBarAddon from "@/components/NavigationBarAddon";

interface ISeatNavigationBar {
  onFinish: () => void;
  subTotal?: string;
}
const SeatNavigationBar: React.FC<ISeatNavigationBar> = (props) => {
  const { onFinish, subTotal } = props;
  return (
    <NavigationBarAddon
      className="sticky bottom-0 bg-white z-20 h-20"
      onClick={onFinish}
      subTotal={subTotal}
      addOn="seats"
    />
  );
};
export default memo(SeatNavigationBar);
