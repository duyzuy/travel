"use client";
import React, { memo, useCallback } from "react";

import { useReactiveVar } from "@apollo/client";
import { flightsFilterVar, BRANDS, FILTER_KEYS } from "@/cache/vars";
import { VNABrandIcon, BBBrandIcon, VJBrandOneIcon } from "@/assets/icons";
import FilterBrandItem from "./FilterBrandItem";
import { useFlightFilter } from "@/hooks/useFlightFilter";
const FilterBrands = () => {
  const { brands } = useReactiveVar(flightsFilterVar);

  const onFilter = useFlightFilter(flightsFilterVar);

  const handleFilter = useCallback((code: BRANDS) => {
    onFilter({ key: FILTER_KEYS.BRAND, value: code });
  }, []);
  const BRANDS_FILTER = [
    { name: "Vietjet", icon: VJBrandOneIcon, code: "VJ" },
    { name: "Vietnam Airline", icon: VNABrandIcon, code: "VN" },
    { name: "Bamboo Airway", icon: BBBrandIcon, code: "QH" },
  ];
  return (
    <>
      <ul className="order-list">
        {BRANDS_FILTER.map((item) => (
          <FilterBrandItem
            key={item.code}
            onClick={handleFilter}
            name={item.name}
            iconPath={item.icon}
            isActive={brands.includes(item.code)}
            code={item.code as BRANDS}
          />
        ))}
      </ul>
    </>
  );
};
export default memo(FilterBrands);
