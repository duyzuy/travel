"use client";
import React, { memo } from "react";
import MealIcon from "@/assets/icons/ico-dish.svg";

import ServiceItem from "@/components/Flights/ServiceItem";
interface IMealService {
  onShowMealDrawler: () => void;
}
const MealService: React.FC<IMealService> = ({ onShowMealDrawler }) => {
  return (
    <ServiceItem
      thumbnail={MealIcon}
      label="Lựa chọn món ăn"
      description="Thưởng thức món ăn nóng hổi"
      onClick={onShowMealDrawler}
    />
  );
};
export default memo(MealService);
