"use client";
import React, { memo } from "react";

const OrderSummary: React.FC<{ className?: string }> = ({
  className = "w-2/6",
}) => {
  return (
    <div className={`summary ${className}`}>
      <div className="summary box bg-white rounded-sm px-4 pt-6 shadow-sm mb-6">
        <div className="box-sector">
          <div className="flight-detail-head">
            <div className="collapse-head">
              <p className="flex items-center">
                <span>TP Hồ Chí Minh SGN</span>
                <span className="mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </span>
                <span>Hà Nội (HAN) </span>
              </p>
              <p className="flex items-center text-xs text-gray-600 py-2">
                <span>Vietjet Air</span>
                <span className="mx-2">|</span>
                <span>09:45&nbsp; - &nbsp;11:55</span>
                <span className="mx-2">|</span> <span>CN,&nbsp;13/08/2023</span>
              </p>
            </div>

            {/* <div className="flight-detail-break">
            <FlightInformationDetail isOpen padding="sm" />
          </div> */}
          </div>
        </div>
        <div className="border-t my-4"></div>
        <div className="box-sector">
          <div className="flight-detail-head">
            <div className="collapse-head">
              <p className="flex items-center">
                <span>TP Hồ Chí Minh SGN</span>
                <span className="mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </span>
                <span>Hà Nội (HAN) </span>
              </p>
              <p className="flex items-center text-xs text-gray-600 py-2">
                <span>Vietjet Air</span>
                <span className="mx-2">|</span>
                <span>09:45&nbsp; - &nbsp;11:55</span>
                <span className="mx-2">|</span> <span>CN,&nbsp;13/08/2023</span>
              </p>
            </div>
            {/* <div className="flight-detail-break">
            <FlightInformationDetail isOpen padding="sm" />
          </div> */}
          </div>
        </div>
        <div className="box-body">
          <div className="box-bottom mt-3 border-t">
            <p className="flex items-center py-4 text-emerald-500">
              <span>Xem chi tiết chuyến bay</span>
              <span className="block ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="box shadow-sm price-breakdown bg-white px-4 pt-6">
        <div className="price-breakdown-sector">
          <div className="sector-price--label">
            <h4 className="text-lg py-2">Chi tiết giá chiều đi</h4>
          </div>
          <ul className="price-breakdown-items text-sm text-gray-600">
            <li className="flex items-center justify-between py-2">
              <span>Người lớn</span>
              <span>2 x 1.198.000</span>
            </li>
            <li className="flex items-center justify-between py-2">
              <span>Trẻ em</span>
              <span>2 x 1.198.000</span>
            </li>
            <li className="flex items-center justify-between py-2">
              <span>Em bé</span>
              <span>Miễn phí</span>
            </li>
            <li className="flex items-center justify-between py-2">
              <span>Thuế và phí sân bay</span>
              <span>2 x 2.446.000</span>
            </li>
            <li className="flex items-center justify-between py-2">
              <span>Phí dịch vụ</span>
              <span>140.000</span>
            </li>
          </ul>
          <div className="price-breakdown-sector-total">
            <p className="py-2 flex justify-between items-center">
              <span>Tổng giá chiều đi</span> <span>4.864.000</span>
            </p>
          </div>
        </div>
        <div className="line border-t border-spacing-1 my-2"></div>
        <div className="price-breakdown-sector">
          <div className="sector-price--label">
            <h4 className="text-lg py-2">Chi tiết giá chiều về</h4>
          </div>
          <ul className="price-breakdown-items text-sm text-gray-600">
            <li className="flex items-center justify-between py-2">
              <span>Người lớn</span>
              <span>2 x 1.198.000</span>
            </li>
            <li className="flex items-center justify-between py-2">
              <span>Trẻ em</span>
              <span>2 x 1.198.000</span>
            </li>
            <li className="flex items-center justify-between py-2">
              <span>Em bé</span>
              <span>Miễn phí</span>
            </li>
            <li className="flex items-center justify-between py-2">
              <span>Thuế và phí sân bay</span>
              <span>2 x 2.446.000</span>
            </li>
            <li className="flex items-center justify-between py-2">
              <span>Phí dịch vụ</span>
              <span>140.000</span>
            </li>
          </ul>
          <div className="price-breakdown-sector-total">
            <p className="py-2 flex justify-between items-center">
              <span>Tổng giá chiều đi</span> <span>4.864.000</span>
            </p>
          </div>
        </div>
        <div className="line border-t-4 border-spacing-1 my-2"></div>
        <div className="price-breakdown-total flex items center justify-between pb-6 pt-2">
          <div className="label">
            <p>Tổng giá vé</p>
            <p className="text-xs text-gray-500">Đã bao gồm thuế, phí, VAT</p>
          </div>
          <p>8.704.480</p>
        </div>
      </div>
    </div>
  );
};
export default memo(OrderSummary);
