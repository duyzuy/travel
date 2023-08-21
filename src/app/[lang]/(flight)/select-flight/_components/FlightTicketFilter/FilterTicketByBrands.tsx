"use client";
import React, { memo } from "react";

import { BRANDS, FILTER_KEYS, Brands } from "@/cache/vars";
import Image, { StaticImageData } from "next/image";
import Checkbox from "@/components/base/Checkbox";

interface Props {
  itemList: { name: string; icon: StaticImageData; code: string }[];
  onFilter: ({ key, value }: { key: FILTER_KEYS.BRAND; value: BRANDS }) => void;
  filters: Brands;
  labelText: string;
}
const FilterTicketByBrands: React.FC<Props> = ({
  itemList,
  onFilter,
  filters,
  labelText,
}) => {
  return (
    <div className="box-filter border-b pb-4">
      <div className="inner">
        <div className="box-filter-head pt-6 pb-2">
          <p className="font-bold">{labelText}</p>
        </div>
        <div className="box-filter-body">
          <ul className="order-list">
            {itemList.map((item) => (
              <li
                key={item.name}
                className="item flex items-center py-2"
                onClick={() =>
                  onFilter({
                    key: FILTER_KEYS.BRAND,
                    value: item.code as BRANDS,
                  })
                }
              >
                <Checkbox
                  name="brand"
                  isChecked={filters.includes(item.code)}
                />
                <Image
                  src={item.icon}
                  width={30}
                  height={30}
                  alt={item.name}
                  className="mx-2 rounded-full border p-1"
                />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default memo(FilterTicketByBrands);
