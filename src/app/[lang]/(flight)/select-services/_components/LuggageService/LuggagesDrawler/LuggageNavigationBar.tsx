"use client";
import React, { memo } from "react";
import NavigationBarAddon from "@/components/NavigationBarAddon";

interface ILuggageNavigationBar {
  onFinish: () => void;
}
const LuggageNavigationBar: React.FC<ILuggageNavigationBar> = (props) => {
  const { onFinish } = props;
  return (
    <NavigationBarAddon
      className="sticky bottom-0 bg-white z-20"
      onClick={onFinish}
    />
  );
};
export default memo(LuggageNavigationBar);
