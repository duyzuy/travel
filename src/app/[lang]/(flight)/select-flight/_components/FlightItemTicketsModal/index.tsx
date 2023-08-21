"use client";

import React, { memo } from "react";
import Modal from "@/components/base/Modal";

import { flightItemTicketModalVar } from "@/cache/vars";
import { useModal } from "@/hooks/useModal";
import { useReactiveVar } from "@apollo/client";
import { FlightDetailItemType } from "@/Models/ticket";
import { moneyFormatVND } from "@/utils/helper";
import Ticket from "./Ticket";
import { format } from "date-fns";
import { FORMAT_DATE_SHORT } from "@/constants/config";
import FlightSchedule from "@/components/Flights/FlightTicketItem/FlightSchedule";
const FlightItemTicketsModal: React.FC<{
  data: { tid: string; outbound: FlightDetailItemType };
  childs: { tid: string; outbound: FlightDetailItemType }[];
}> = ({ data, childs }) => {
  const isShowModal = useReactiveVar(flightItemTicketModalVar);
  const { onCloseModal } = useModal(flightItemTicketModalVar);

  const { outbound } = data;

  const ContentsModal = () => {
    return (
      <>
        <div className="flight-items-modal">
          <div className="flight-item-detail flex items-center mb-4 px-4 py-2">
            {/* <FlightSchedule data={outbound} /> */}
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

            {childs.map((flItem) => (
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
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <Modal
      // modalTitle="Đăng ký tài khoản"
      width="full"
      isOpen={isShowModal}
      bodyContent={<ContentsModal />}
      onclose={onCloseModal}
      // onCancel={() => {}}
      // onSubmit={() => {}}
    />
  );
};
export default memo(FlightItemTicketsModal);
