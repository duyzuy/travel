"use client";

import Image from "next/image";
import React, { memo } from "react";
import {
  IconCarental,
  IconShipping,
  IconTicketFlight,
  IconTour,
  Iconhotel,
} from "@/components/Icons";
const BookingTabs = () => {
  console.log("render tab");
  return (
    <div className="tabs booking-tab px-3 pt-3">
      <ul className="flex flex-wrap gap-x-3 booking-tab-list">
        <li className="px-4 py-2 flex items-center booking-tab-item active">
          <IconTicketFlight className="mr-2" />
          <span>Vé máy bay</span>
        </li>
        <li className="px-4 py-3 flex items-center booking-tab-item">
          <IconShipping className="mr-2" />
          Vận chuyển
        </li>
        <li className="px-4 py-3 flex items-center booking-tab-item">
          <IconCarental className="mr-2" />
          <span> Thuê xe</span>
        </li>
        <li className="px-4 py-3 flex items-center booking-tab-item">
          <Iconhotel className="mr-2" />
          <span>Khách sạn</span>
        </li>
        <li className="px-4 py-3 flex items-center booking-tab-item">
          <IconTour className="mr-2" />
          <span>Tours</span>
        </li>
      </ul>
    </div>
  );
};
export default memo(BookingTabs);
