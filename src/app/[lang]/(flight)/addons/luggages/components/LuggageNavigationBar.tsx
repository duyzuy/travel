"use client";
import React, { memo } from "react";
import NavigationBarAddon from "@/components/NavigationBarAddon";

const LuggageNavigationBar: React.FC = () => {
  return <NavigationBarAddon className="sticky bottom-0 bg-white z-20" />;
};
export default memo(LuggageNavigationBar);
