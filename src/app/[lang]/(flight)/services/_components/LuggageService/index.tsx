"use client";
import React, { memo, useMemo } from "react";

import LuggageIcon from "@/assets/icons/suitcase.svg";

import ServiceItem from "@/components/Flights/ServiceItem";
import { IBookingServices } from "@/modules/bookingServices/bookingServices.interface";
import { IFlightBookingInformation } from "@/modules/bookingTicket/bookingInformation.interface";
import SegmentType from "@/components/Flights/SegmentType";
import classNames from "classnames";
import { moneyFormatVND } from "@/utils/helper";

interface ILuggageService {
  onShowLuggageDrawler: () => void;
  selectedService?: IBookingServices["luggages"];
  flightDeparture: IFlightBookingInformation["flightDepart"];
  flightReturn: IFlightBookingInformation["flightReturn"];
}
const LuggageService: React.FC<ILuggageService> = ({
  onShowLuggageDrawler,
  selectedService,
  flightDeparture,
  flightReturn,
}) => {
  const luggageDepart = useMemo(() => {
    return selectedService?.flightDepart;
  }, [selectedService]);

  const luggageReturn = useMemo(() => {
    return selectedService?.flightReturn;
  }, [selectedService]);

  const totalPrice = useMemo(() => {
    let total = 0;
    if (luggageDepart) {
      total = luggageDepart.reduce((sum, item) => {
        return (
          sum + item.item.ancillaryCharges[0].currencyAmounts[0].baseAmount
        );
      }, 0);
    }

    if (luggageReturn) {
      total =
        total +
        luggageReturn.reduce((sum, item) => {
          return (
            sum + item.item.ancillaryCharges[0].currencyAmounts[0].baseAmount
          );
        }, 0);
    }

    return total;
  }, [luggageDepart, luggageReturn]);
  return (
    <ServiceItem
      thumbnail={LuggageIcon}
      label="Thêm hành lý ký gửi"
      description=" Thêm hành lý để thuận tiện hơn cho chuyến đi. Mua bây giờ rẻ hơn
  tại quầy"
      onClick={onShowLuggageDrawler}
      subtotalStr={totalPrice !== 0 ? moneyFormatVND(totalPrice) : undefined}
      selectedItems={
        <div className="flex border-t border-gray-100 pt-4 mt-4">
          {flightDeparture ? (
            <div className="w-1/2">
              <SegmentType
                departureAirport={
                  flightDeparture.ticket.outbound.departureAirport
                }
                arrivalAirport={flightDeparture.ticket.outbound.arrivalAirport}
              />
              <div className="items items-center">
                {luggageDepart ? (
                  <div className="flex items-center">
                    {luggageDepart.map((item, _index) => (
                      <div key={`${item.item.key}-${item.passenger.index}`}>
                        <span
                          className={classNames({
                            "text-sm text-gray-600": true,
                          })}
                        >
                          {_index !== 0 ? ", " : null}
                          {item.item.ancillaryItem.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  "--"
                )}
              </div>
            </div>
          ) : null}
          {flightReturn ? (
            <div className="w-1/2">
              <SegmentType
                departureAirport={flightReturn.ticket.outbound.departureAirport}
                arrivalAirport={flightReturn.ticket.outbound.arrivalAirport}
              />
              <div className="items items-center">
                {luggageReturn ? (
                  <div className="flex items-center">
                    {luggageReturn.map((item, _index) => (
                      <div key={`${item.item.key}-${item.passenger.index}`}>
                        <span
                          className={classNames({
                            "text-sm text-gray-600": true,
                          })}
                        >
                          {_index !== 0 ? ", " : null}
                          {item.item.ancillaryItem.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  "--"
                )}
              </div>
            </div>
          ) : null}
        </div>
      }
    />
  );
};
export default memo(LuggageService);
