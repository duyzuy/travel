"use client";
import React, { memo } from "react";
import NavigationBarAddon from "@/components/NavigationBarAddon";

interface IMealNavigationBar {
  onFinish: () => void;
}
const MealNavigationBar: React.FC<IMealNavigationBar> = (props) => {
  const { onFinish } = props;
  return (
    <NavigationBarAddon
      className="sticky bottom-0 bg-white z-20"
      onClick={onFinish}
    />
  );
};
export default memo(MealNavigationBar);
