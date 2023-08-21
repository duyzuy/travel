"use client";

import React, { memo, useCallback, useState } from "react";
import { FlightDetailItemType } from "@/Models/ticket";
import classNames from "classnames";
import { Airline, Airlines } from "@/Models/airline";
import FlightSchedule from "./FlightSchedule";
import FlightOperation from "./FlightOperation";
import FlightInformationDetail from "../FlightInformationDetail";
import Button from "@/components/base/Button";
import { durationToString } from "@/helpers/flightItem";
type PropsType = {
  oneStop?: boolean;
  flightItemData: FlightDetailItemType;
  operation?: Airline;
  tid: string;
  onSelectFlight: () => void;
  isSelected: boolean;
  airlines: Airlines;
  flightNumber: string;
  price: string;
};
enum TICKET_PANEL {
  TICKET_DETAIL = "ticketDetail",
  FLIGHT_INFO = "flightInfo",
}
const FlightItem = ({
  flightItemData,
  operation,
  flightNumber,
  isSelected = false,
  onSelectFlight,
  airlines,
  price,
}: PropsType) => {
  const [ticketPanel, setTicketPanel] = useState<TICKET_PANEL | undefined>(
    undefined
  );

  return (
    <div
      className={classNames({
        " flight-item shadow-sm rounded-sm bg-white mb-4 border  overflow-hidden transition-colors":
          true,
        "border-slate-100 hover:border-emerald-500": !isSelected,
        "isSelected border-emerald-500": isSelected,
      })}
    >
      <div className="flight-item-top flex items-center px-4 pt-4">
        <FlightOperation
          operation={operation}
          flightNumber={flightNumber}
          className="w-44"
        />
        <FlightSchedule
          arrivalAirport={flightItemData.arrivalAirport}
          departureAirport={flightItemData.departureAirport}
          transitTickets={flightItemData.transitTickets}
          departureTimeStr={flightItemData.departureTimeStr}
          arrivalTimeStr={flightItemData.arrivalTimeStr}
          durationStr={durationToString(flightItemData.duration)}
        />
        <FlightItem.Pricings price={price} />
      </div>

      <FlightItem.Actions
        className="flight-item-bottom"
        isActivePanel={ticketPanel}
        onSelect={onSelectFlight}
        onShowTicketDetail={() =>
          setTicketPanel((prev) =>
            prev ? undefined : TICKET_PANEL.TICKET_DETAIL
          )
        }
      />

      <FlightInformationDetail
        isOpen={ticketPanel === TICKET_PANEL.TICKET_DETAIL}
        data={flightItemData}
        airlines={airlines}
        className="border-t"
      />
    </div>
  );
};

export default memo(FlightItem);

interface IFlightItemPrice {
  price: string;
  currency?: string;
}
FlightItem.Pricings = function FlightItemPrice({ price }: IFlightItemPrice) {
  return (
    <div className="right w-44 text-right">
      <div className="price ">
        <span className="amount text-xl font-bold text-emerald-500 drop-shadow-sm">
          {price}
        </span>
      </div>
    </div>
  );
};

interface IFlightItemActions {
  onSelect: () => void;
  onShowTicketDetail: () => void;
  isActivePanel?: TICKET_PANEL;
  className?: string;
}

FlightItem.Actions = function FlightItemActions({
  onShowTicketDetail,
  onSelect,
  isActivePanel,
  className = "",
}: IFlightItemActions) {
  return (
    <div
      className={classNames({
        "flex items-center justify-between px-4 py-2": true,
        [className]: className,
      })}
    >
      <ul className="action flex items-center text-sm text-gray-600">
        <li
          className="btn py-2 cursor-pointer hover:text-emerald-500 relative mr-6"
          onClick={onShowTicketDetail}
        >
          <span>Thông tin chuyến bay</span>
          {isActivePanel === TICKET_PANEL.TICKET_DETAIL ? (
            <span className="absolute -bottom-2 w-12 h-1 block bg-emerald-500 rounded-tl rounded-tr panel-active"></span>
          ) : null}
        </li>
      </ul>
      <div className="flight-actions text-right">
        <Button
          color="secondary"
          size="sm"
          className="w-24 lg:text-sm"
          rounded="sm"
          onClick={onSelect}
        >
          Chọn
        </Button>
      </div>
    </div>
  );
};
