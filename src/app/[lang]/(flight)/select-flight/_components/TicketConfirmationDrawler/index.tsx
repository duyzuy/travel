"use client";

import React, { memo } from "react";
import Modal from "@/components/base/Modal";

import { flightItemTicketModalVar } from "@/cache/vars";
import { useModal } from "@/hooks/useModal";
import { useReactiveVar } from "@apollo/client";
import { moneyFormatVND } from "@/utils/helper";
import Ticket from "./Ticket";
import Drawler from "@/components/base/Drawler";
import { FlightTicket } from "@/Models/flight/ticket";

import FlightSchedule from "@/components/Flights/FlightTicketItem/FlightSchedule";
interface IFlightConfirmationModal {
  flightDepart: {
    ticket: FlightTicket;
    others: FlightTicket[];
  };
  flightReturn?: {
    ticket: FlightTicket;
    others: FlightTicket[];
  };
}
const TicketConfirmationModal: React.FC<IFlightConfirmationModal> = ({
  flightDepart,
  flightReturn,
}) => {
  const isShowModal = useReactiveVar(flightItemTicketModalVar);
  const { onCloseModal } = useModal(flightItemTicketModalVar);

  const {
    ticket: { outbound },
    others,
  } = flightDepart;

  const ContentsModal = () => {
    return (
      <>
        <div className="flight-items-modal">
          <div className="flight-item-detail flex items-center mb-4 px-4 py-2">
            {/* <FlightSchedule /> */}
          </div>
          <div className="tickets flex">
            {(outbound.transitTickets && (
              <Ticket
                polices={outbound.transitTickets[0].polices}
                fareName={outbound.ticketdetail.ticketClassCode}
                price={moneyFormatVND(outbound.ticketdetail.farePrice)}
                isCurrent={true}
              />
            )) || (
              <>
                <Ticket
                  polices={outbound.ticketdetail.polices}
                  fareName={outbound.ticketdetail.ticketClassCode}
                  price={moneyFormatVND(outbound.ticketdetail.farePrice)}
                  isCurrent={true}
                />
              </>
            )}

            {/* {childs.map((flItem) => (
              <React.Fragment key={flItem.tid}>
                {(flItem.outbound.transitTickets && (
                  <Ticket
                    polices={flItem.outbound.transitTickets[0].polices}
                    fareName={flItem.outbound.ticketdetail.ticketClassCode}
                    price={moneyFormatVND(
                      flItem.outbound.ticketdetail.farePrice
                    )}
                  />
                )) || (
                  <>
                    {" "}
                    <Ticket
                      polices={flItem.outbound.ticketdetail.polices}
                      fareName={flItem.outbound.ticketdetail.ticketClassCode}
                      price={moneyFormatVND(
                        flItem.outbound.ticketdetail.farePrice
                      )}
                    />
                  </>
                )}
              </React.Fragment>
            ))} */}
          </div>
        </div>
      </>
    );
  };

  return (
    <Drawler
      // modalTitle="Đăng ký tài khoản"
      width="xl"
      isOpen={true}
      // onCancel={() => {}}
      // onSubmit={() => {}}
    >
      <ContentsModal />
    </Drawler>
  );
};
export default memo(TicketConfirmationModal);
