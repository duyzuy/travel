import React, { memo } from "react";
import Checkbox from "../base/Checkbox";
import Image from "next/image";
import { BRANDS } from "@/cache/vars";
export const BrandItemCheckbox: React.FC<{
  isActive: boolean;
  iconPath: any;
  name: string;
  code: BRANDS;
  onClick: (brand: BRANDS) => void;
}> = ({ isActive, iconPath, name, code, onClick }) => {
  return (
    <li className="item flex items-center py-2" onClick={() => onClick(code)}>
      <Checkbox name="brand" isChecked={isActive} />
      <Image
        src={iconPath}
        width={30}
        height={30}
        alt={name}
        className="mx-2 rounded-full border p-1"
      />
      <span>{name}</span>
    </li>
  );
};
export default memo(BrandItemCheckbox);
