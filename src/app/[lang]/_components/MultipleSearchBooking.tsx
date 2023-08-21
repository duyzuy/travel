"use client";
import React, { memo } from "react";
import {
  IconCarental,
  IconShipping,
  IconTicketFlight,
  IconTour,
  Iconhotel,
} from "@/components/Icons";
import FlightSearchForm from "./FlightSearchForm";

const MultipleSearchBooking: React.FC<{
  children?: React.ReactNode;
}> = () => {
  return (
    <div className="multiple-search-form -mt-12 relative z-10">
      <div className="container mx-auto drop-shadow-md bg-white">
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
        <div className="booking-form-wrapper px-3 pt-6 pb-6">
          <FlightSearchForm />
        </div>
      </div>
    </div>
  );
};
export default memo(MultipleSearchBooking);
