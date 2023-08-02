"use client";

import React, { memo } from "react";
import NavigationBarAddon from "@/components/NavigationBarAddon";
const SeatBookingNavigation = () => {
  return (
    <NavigationBarAddon
      className="sticky bottom-0 bg-white"
      buttonText="Chuyến tiếp theo"
    />
  );
};
export default SeatBookingNavigation;
