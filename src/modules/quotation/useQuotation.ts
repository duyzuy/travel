import { ReactiveVar } from "@apollo/client";
import { IQuotation } from "./quotation.interface";
import { IFlightBookingInformation } from "../bookingTicket/bookingInformation.interface";
import { useMemo } from "react";
import { PASSENGER_TYPE } from "@/constants/enum";
const useQuotation = (
  bookingInformationVar: ReactiveVar<IFlightBookingInformation>
) => {
  const bookingInformation = bookingInformationVar();

  const { flightDepart, flightReturn, services, bookingInfo } =
    bookingInformation;

  const departTicketCharge = useMemo(() => {
    if (!flightDepart) {
      return null;
    }
    const ticketDetail = flightDepart.ticket.outbound.ticketdetail;

    const {
      farePriceAdult,
      priceAdultUnit,
      priceAdults,
      priceInfants,
      priceChildUnit,
      priceChildren,
      priceInfantUnit,
      farePriceChild,
      grandTotal,
    } = ticketDetail;

    return {
      adult: {
        chargeName: "Người lớn",
        amount: 0,
        farePriceAdult: farePriceAdult,
        priceAdultUnit: priceAdultUnit,
        priceAdults: priceAdults,
      },
      children: {
        amount: 0,
        priceChildUnit: priceChildUnit,
        priceChildren: priceChildren,
        farePriceChild: farePriceChild,
      },
      infant: {
        amount: 0,
        priceInfantUnit: priceInfantUnit,
        priceInfants: priceInfants,
      },
      grandTotal: grandTotal,
    };
  }, [flightDepart]);

  return {
    flightDepart: {
      fareTicket: departTicketCharge,
    },
  };
};
export default useQuotation;
