"use client";
import React, { memo, useMemo } from "react";
import { bookingInformationVar } from "@/cache/vars";
import { airlinesVar } from "@/cache/vars/flight/airline";
import { useReactiveVar } from "@apollo/client";
import { getOperationFromFlightNumber } from "@/helpers/flightItem";

import FlightSummaryInfo from "@/components/Flights/FlightSummaryInfo";
import useQuotation from "@/modules/quotation/useQuotation";
import classNames from "classnames";
const FlightBookingSummary: React.FC<{ className?: string }> = ({
  className = "w-2/6",
}) => {
  const bookingInformation = useReactiveVar(bookingInformationVar);
  const airlines = useReactiveVar(airlinesVar);
  const quotation = useQuotation(bookingInformationVar);
  console.log(quotation);
  const flightSelectedDepart = useMemo(() => {
    return bookingInformation.flightDepart;
  }, [bookingInformation]);

  const flightSelectedReturn = useMemo(() => {
    return bookingInformation.flightReturn;
  }, [bookingInformation]);
  const getFlightType = (numStop: number) => {
    if (numStop === 0) {
      return "Bay Thẳng";
    }
    return `${numStop} điểm dừng`;
  };
  return (
    <div
      className={classNames({
        summary: true,
        [className]: className,
      })}
    >
      <div className="summary box bg-white rounded-sm px-4 pt-4 shadow-sm mb-6">
        {flightSelectedDepart ? (
          <FlightSummaryInfo
            departureCity={flightSelectedDepart.ticket.outbound.departureCity}
            departureCode={
              flightSelectedDepart.ticket.outbound.departureAirport
            }
            arrivalCity={flightSelectedDepart.ticket.outbound.arrivalCity}
            arrivalCode={flightSelectedDepart.ticket.outbound.arrivalAirport}
            flightNumber={flightSelectedDepart.ticket.outbound.flightNumber}
            departureTimeStr={
              flightSelectedDepart.ticket.outbound.departureTimeStr
            }
            departureDayStr={
              flightSelectedDepart.ticket.outbound.departureDayStr
            }
            arrivalDayStr={flightSelectedDepart.ticket.outbound.arrivalDayStr}
            arrivalTimeStr={flightSelectedDepart.ticket.outbound.arrivalTimeStr}
            airline={getOperationFromFlightNumber(
              airlines,
              flightSelectedDepart.ticket.outbound.flightNumber
            )}
            flightType={getFlightType(
              flightSelectedDepart.ticket.outbound.ticketdetail.numStops
            )}
          />
        ) : null}

        {flightSelectedReturn ? (
          <React.Fragment>
            <div className="border-t my-4"></div>

            <FlightSummaryInfo
              departureCity={flightSelectedReturn.ticket.outbound.departureCity}
              departureCode={
                flightSelectedReturn.ticket.outbound.departureAirport
              }
              arrivalCity={flightSelectedReturn.ticket.outbound.arrivalCity}
              arrivalCode={flightSelectedReturn.ticket.outbound.arrivalAirport}
              flightNumber={flightSelectedReturn.ticket.outbound.flightNumber}
              departureTimeStr={
                flightSelectedReturn.ticket.outbound.departureTimeStr
              }
              departureDayStr={
                flightSelectedReturn.ticket.outbound.departureDayStr
              }
              arrivalDayStr={flightSelectedReturn.ticket.outbound.arrivalDayStr}
              arrivalTimeStr={
                flightSelectedReturn.ticket.outbound.arrivalTimeStr
              }
              airline={getOperationFromFlightNumber(
                airlines,
                flightSelectedReturn.ticket.outbound.flightNumber
              )}
              flightType={getFlightType(
                flightSelectedReturn.ticket.outbound.ticketdetail.numStops
              )}
            />
          </React.Fragment>
        ) : null}
        <div className="box-body">
          <div className="box-bottom mt-3 border-t">
            <p className="flex items-center py-4 text-emerald-500">
              <span className="text-sm">Xem chi tiết chuyến bay</span>
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

      <div className="box shadow-sm price-breakdown bg-white px-4 pt-2">
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
export default memo(FlightBookingSummary);
