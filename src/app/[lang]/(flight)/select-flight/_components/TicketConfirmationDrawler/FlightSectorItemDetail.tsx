"use client";

import { FlightTicket } from "@/Models/flight/ticket";
import FlightSchedule from "@/components/Flights/FlightTicketItem/FlightSchedule";
import { durationToString } from "@/helpers/flightItem";
import TicketBox from "./Ticketbox";
import { moneyFormatVND } from "@/utils/helper";
import { FLIGHT_DIRECTION } from "@/constants/enum";
import classNames from "classnames";
interface IFlightSectorItemDetail {
  onSelect: (ticket: FlightTicket) => void;
  ticket: FlightTicket;
  otherTickets: FlightTicket[];
  sectorLabel: string;
  className: string;
}
const FlightSectorItemDetail = ({
  ticket,
  otherTickets,
  sectorLabel,
  className,
}: IFlightSectorItemDetail) => {
  return (
    <>
      <div
        className={classNames({
          "header pt-6 px-6": true,
          [className]: className,
        })}
      >
        <h3 className="text-xl">{sectorLabel}</h3>
        <div className="flight-leg">
          <ul className="flex items -center">
            <li>
              <span>{ticket.outbound.departureCity}</span>
              <span className="space mx-1">-</span>
              <span>({ticket.outbound.departureAirport})</span>
            </li>
            <span className="icon mx-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                ></path>
              </svg>
            </span>
            <li>
              <span>{ticket.outbound.arrivalCity}</span>
              <span className="space mx-1">-</span>
              <span>({ticket.outbound.arrivalAirport})</span>
            </li>
          </ul>
        </div>
      </div>

      <FlightSchedule
        departureTimeStr={ticket.outbound.departureTimeStr}
        arrivalTimeStr={ticket.outbound.arrivalTimeStr}
        departureAirport={ticket.outbound.departureAirport}
        arrivalAirport={ticket.outbound.arrivalAirport}
        transitTickets={ticket.outbound.transitTickets}
        durationStr={durationToString(ticket.outbound.duration)}
        position="left"
        className="mb-4 py-4"
      />

      <div className="others px-6">
        <div className="other-tickets flex -mx-2 flex-wrap">
          {otherTickets.map((_otherTicket) => (
            <TicketBox
              polices={
                (_otherTicket.outbound.transitTickets &&
                  _otherTicket.outbound.transitTickets[0].polices) ||
                undefined
              }
              fareName={_otherTicket.outbound.ticketdetail.ticketClassCode}
              price={moneyFormatVND(
                _otherTicket.outbound.ticketdetail.farePrice
              )}
              isCurrent={_otherTicket.tid === ticket.tid}
              className="w-1/3 mb-6"
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default FlightSectorItemDetail;
