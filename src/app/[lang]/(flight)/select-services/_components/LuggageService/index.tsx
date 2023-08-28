"use client";
import React, { memo, useMemo } from "react";

import LuggageIcon from "@/assets/icons/suitcase.svg";

import ServiceItem from "@/components/Flights/ServiceItem";
import { IBookingServices } from "@/modules/bookingServices/bookingServices.interface";
import { IFlightBookingInformation } from "@/modules/bookingTicket/bookingInformation.interface";
import SegmentType from "@/components/Flights/SegmentType";
import classNames from "classnames";

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
  return (
    <ServiceItem
      thumbnail={LuggageIcon}
      label="Thêm hành lý ký gửi"
      description=" Thêm hành lý để thuận tiện hơn cho chuyến đi. Mua bây giờ rẻ hơn
  tại quầy"
      onClick={onShowLuggageDrawler}
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
                      <div key={`${item.item.id}-${item.passenger.index}`}>
                        <span
                          className={classNames({
                            "text-emerald-400 font-bold": true,
                          })}
                        >
                          {_index !== 0 ? ", " : null}
                          {item.item.name}
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
                      <div key={`${item.item.id}-${item.passenger.index}`}>
                        <span
                          className={classNames({
                            "text-emerald-400 font-bold": true,
                          })}
                        >
                          {_index !== 0 ? ", " : null}
                          {item.item.name}
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
