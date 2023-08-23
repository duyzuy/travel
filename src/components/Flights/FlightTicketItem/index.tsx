"use client";

import React, { memo, useState } from "react";
import { FlightTicket } from "@/Models/flight/ticket";
import classNames from "classnames";
import { Airline } from "@/Models/flight/airline";
import FlightSchedule from "./FlightSchedule";
import FlightOperation from "./FlightOperation";
import Button from "@/components/base/Button";
import {
  durationToString,
  getOperationFromFlightNumber,
} from "@/helpers/flightItem";
import { moneyFormatVND } from "@/utils/helper";
import FlightTicketDetail from "./FlightTicketDetail";

interface IFlightTicketItem {
  ticketInfo: FlightTicket["outbound"];
  onSelectFlight: () => void;
  isSelected: boolean;
  children?: React.ReactNode;
  airlines: Airline[];
}
enum PANEL_TYPE {
  TICKET_DETAIL = "ticketDetail",
  FLIGHT_INFO = "flightInfo",
}
const FlightTicketItem = ({
  ticketInfo,
  isSelected = false,
  onSelectFlight,
  airlines,
  children,
}: IFlightTicketItem) => {
  const [ticketPanel, setTicketPanel] = useState<PANEL_TYPE | undefined>(
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
          airline={getOperationFromFlightNumber(
            airlines,
            ticketInfo.flightNumber
          )}
          flightNumber={ticketInfo.flightNumber}
          className="w-44"
        />
        <FlightSchedule
          arrivalAirport={ticketInfo.arrivalAirport}
          departureAirport={ticketInfo.departureAirport}
          transitTickets={ticketInfo.transitTickets}
          departureTimeStr={ticketInfo.departureTimeStr}
          arrivalTimeStr={ticketInfo.arrivalTimeStr}
          durationStr={durationToString(ticketInfo.duration)}
        />
        <FlightTicketItem.Pricings
          priceStr={moneyFormatVND(ticketInfo.ticketdetail.farePrice)}
        />
      </div>

      <FlightTicketItem.Actions
        className="flight-item-bottom"
        isActivePanel={ticketPanel}
        onSelect={onSelectFlight}
        onShowTicketDetail={() =>
          setTicketPanel((prev) =>
            prev ? undefined : PANEL_TYPE.TICKET_DETAIL
          )
        }
      />
      <FlightTicketItem.TicketDetail
        isOpen={PANEL_TYPE.TICKET_DETAIL === ticketPanel}
        ticketInfo={ticketInfo}
        airlines={airlines}
        className="border-t"
      />
    </div>
  );
};

export default memo(FlightTicketItem);

interface IFlightItemPrice {
  priceStr: string;
  currency?: string;
}
FlightTicketItem.Pricings = function FlightItemPrice({
  priceStr,
}: IFlightItemPrice) {
  return (
    <div className="right w-44 text-right">
      <div className="price ">
        <span className="amount text-xl font-bold text-emerald-500 drop-shadow-sm">
          {priceStr}
        </span>
      </div>
    </div>
  );
};

interface IFlightItemActions {
  onSelect: () => void;
  onShowTicketDetail: () => void;
  isActivePanel?: PANEL_TYPE;
  className?: string;
}

FlightTicketItem.Actions = function FlightItemActions({
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
          {isActivePanel === PANEL_TYPE.TICKET_DETAIL ? (
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
interface IFlightTicketDetail {
  isOpen: boolean;
  ticketInfo: FlightTicket["outbound"];
  airlines: Airline[];
  className?: string;
}
FlightTicketItem.TicketDetail = function FlightItemTicketDetail(
  props: IFlightTicketDetail
) {
  const { isOpen, ticketInfo, airlines, className } = props;
  return (
    <FlightTicketDetail
      isOpen={isOpen}
      ticketInfo={ticketInfo}
      airlines={airlines}
      className={className}
    />
  );
};
