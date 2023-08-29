"use client";
import React, { memo, useMemo } from "react";
import { useApolloClient } from "@apollo/client";
import {
  SEAT_MAP_A320,
  SEAT_MAP_A321,
  SEAT_MAP_A330,
} from "../../../seats/datavj";
import { WRITE_SEAT_MAP } from "@/cache/wtire";
import { IFlightBookingInformation } from "@/modules/bookingTicket/bookingInformation.interface";
import SegmentType from "@/components/Flights/SegmentType";
import ServiceItem from "@/components/Flights/ServiceItem";
import SeatIcon from "@/assets/icons/ico-seats.svg";
import classNames from "classnames";
import { moneyFormatVND } from "@/utils/helper";
interface ISeatService {
  onShowSeatDrawler: () => void;
  seatSelected: IFlightBookingInformation["services"]["seats"];
  flightDeparture?: IFlightBookingInformation["flightDepart"];
  flightReturn?: IFlightBookingInformation["flightReturn"];
}
const SeatService: React.FC<ISeatService> = ({
  onShowSeatDrawler,
  seatSelected,
  flightReturn,
  flightDeparture,
}) => {
  const client = useApolloClient();
  client.writeQuery({
    query: WRITE_SEAT_MAP,
    data: {
      seatMapModel: {
        model: "A330",
        id: "A330",
        ...SEAT_MAP_A330,
        __typename: "airCraftModel",
      },
    },
    variables: {
      model: "A330",
    },
  });
  client.writeQuery({
    query: WRITE_SEAT_MAP,
    data: {
      seatMapModel: {
        model: "A321",
        id: "A321",
        ...SEAT_MAP_A321,
        __typename: "airCraftModel",
      },
    },
    variables: {
      model: "A321",
    },
  });
  client.writeQuery({
    query: WRITE_SEAT_MAP,
    data: {
      seatMapModel: {
        model: "A320",
        id: "A320",
        ...SEAT_MAP_A320,
        __typename: "airCraftModel",
      },
    },
    variables: {
      model: "A320",
    },
  });

  const seatsDepart = useMemo(() => {
    return seatSelected.flightDepart;
  }, [seatSelected]);

  const seatsReturn = useMemo(() => {
    return seatSelected.flightReturn;
  }, [seatSelected]);

  const subTotal = useMemo(() => {
    let total = 0;
    if (seatsDepart) {
      total = seatsDepart.reduce((sum, item) => {
        return sum + item.item.seatCharges[0].currencyAmounts[0].baseAmount;
      }, 0);
    }

    if (seatsReturn) {
      total =
        total +
        seatsReturn.reduce((sum, item) => {
          return sum + item.item.seatCharges[0].currencyAmounts[0].baseAmount;
        }, 0);
    }

    return total;
  }, [seatsReturn, seatsDepart]);
  return (
    <ServiceItem
      thumbnail={SeatIcon}
      label="Lựa chọn ghế ngồi"
      description="Chọn ghế ngồi thoải mái"
      onClick={onShowSeatDrawler}
      subtotalStr={subTotal !== 0 ? moneyFormatVND(subTotal) : undefined}
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
                {seatsDepart ? (
                  <div className="flex items-center">
                    {seatsDepart.map((seatOpt, _index) => (
                      <div key={`${seatOpt.item.selectionKey}`}>
                        <span
                          className={classNames({
                            "text-emerald-400 font-bold": true,
                          })}
                        >
                          {_index !== 0 ? ", " : null}
                          {`${seatOpt.item.seatMapCell.rowIdentifier}-${seatOpt.item.seatMapCell.seatIdentifier}`}
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
                {seatsReturn ? (
                  <div className="flex items-center">
                    {seatsReturn.map((seatOpt, _index) => (
                      <div key={`${seatOpt.item.selectionKey}`}>
                        <span
                          className={classNames({
                            "text-emerald-400 font-bold": true,
                          })}
                        >
                          {_index !== 0 ? ", " : null}
                          {`${seatOpt.item.seatMapCell.rowIdentifier}-${seatOpt.item.seatMapCell.seatIdentifier}`}
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
export default memo(SeatService);
