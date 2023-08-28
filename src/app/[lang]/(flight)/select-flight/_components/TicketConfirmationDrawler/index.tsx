"use client";

import React, { useEffect, useState } from "react";
import Drawler from "@/components/base/Drawler";
import { FlightTicket } from "@/Models/flight/ticket";
import FlightSectorItemDetail from "./FlightSectorItemDetail";
import { FLIGHT_DIRECTION } from "@/constants/enum";
import Button from "@/components/base/Button";
interface IFlightConfirmationModal {
  flightDepart?: {
    ticket: FlightTicket;
    others: FlightTicket[];
  };
  flightReturn?: {
    ticket: FlightTicket;
    others: FlightTicket[];
  };
  isOpen?: boolean;
  onNext: () => void;
  onChangeTicket: (direction: FLIGHT_DIRECTION, ticket: FlightTicket) => void;
}
const TicketConfirmationModal: React.FC<IFlightConfirmationModal> = ({
  flightDepart,
  flightReturn,
  isOpen = false,
  onNext,
  onChangeTicket,
}) => {
  const [isShowModal, setShowModal] = useState(isOpen);

  console.log(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);
  if (!isShowModal) {
    return null;
  }

  const ContentsModal = () => {
    return (
      <div className="flight-items-modal">
        <div className="flight-sector">
          {flightDepart ? (
            <FlightSectorItemDetail
              sectorLabel="Chuyến đi"
              ticket={flightDepart.ticket}
              otherTickets={flightDepart.others}
              onSelect={(ticket) =>
                onChangeTicket(FLIGHT_DIRECTION.DEPARTURE, ticket)
              }
              className="overflow-auto"
            />
          ) : null}

          {flightReturn ? (
            <>
              <div className="spacing pt-4 mt-4 border-t border-separate"></div>
              <FlightSectorItemDetail
                sectorLabel="Chuyến về"
                ticket={flightReturn.ticket}
                otherTickets={flightReturn.others}
                onSelect={(ticket) =>
                  onChangeTicket(FLIGHT_DIRECTION.RETURN, ticket)
                }
                className="overflow-auto"
              />
            </>
          ) : null}
        </div>
        <div className="confirmation-navbar sticky bottom-0 bg-white drop-shadow-2xl">
          <div className="drawler-bottom-bar py-4 flex justify-between px-4">
            <div className="flight-summary">
              <p className="label text-sm">Tổng tiền</p>
              <p className="price text-2xl text-emerald-400 font-bold">
                120.000 VND
              </p>
            </div>
            <Button
              className="w-40 drop-shadow-sm"
              color="secondary"
              size="lg"
              onClick={onNext}
            >
              Tiếp tục
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Drawler
      // modalTitle="Đăng ký tài khoản"
      width="xl"
      isOpen={isShowModal}
      // onCancel={() => {}}
      // onSubmit={() => {}}
      onClose={() => setShowModal(false)}
      hideCloseButton
    >
      <ContentsModal />
    </Drawler>
  );
};
export default TicketConfirmationModal;
