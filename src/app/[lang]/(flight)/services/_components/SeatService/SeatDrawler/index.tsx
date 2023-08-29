"use client";
import React, { memo, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { selectingServicesVar, bookingInformationVar } from "@/cache/vars";
import { FLIGHT_DIRECTION, PASSENGER_TYPE } from "@/constants/enum";
import { ISeatOption } from "@/Models/seatMap";
import SegmentType from "@/components/Flights/SegmentType";
import Drawler from "@/components/base/Drawler";
import SeatSegment from "./SeatSegment";
import SeatNavigationBar from "./SeatNavigationBar";
import { useBookingFlightInfo } from "@/modules/bookingTicket/useBookingFlightInfo";
import { PassengerBookingInformationType } from "@/modules/bookingTicket/bookingInformation.interface";
import useSelectServices from "@/modules/bookingServices/useSelectServices";
import {
  FLIGHT_SERVICES,
  IBookingServices,
  ISeatSeledtedItem,
} from "@/modules/bookingServices/bookingServices.interface";
import { moneyFormatVND } from "@/utils/helper";

interface ISeatDrawler {
  isOpen: boolean;
  onClose: () => void;
  selectedSeats?: IBookingServices["seats"];
}

const SeatDrawler: React.FC<ISeatDrawler> = ({
  isOpen,
  onClose,
  selectedSeats,
}) => {
  const { flightBookingInfo, onAddBookingFlightService } = useBookingFlightInfo(
    bookingInformationVar
  );
  const [flightDirection, setFlightDirection] = useState<FLIGHT_DIRECTION>(
    FLIGHT_DIRECTION.DEPARTURE
  );

  const {
    onAddSeatToFlightDeparture,
    onAddSeatToFlightReturn,
    onInitialServices,
    selectedServices,
  } = useSelectServices(selectingServicesVar);

  const { passengerInformation, flightDepart, flightReturn, bookingInfo } =
    flightBookingInfo;

  const seatSelected = useMemo(() => {
    return selectedServices[FLIGHT_SERVICES.SEATS];
  }, [selectedServices]);

  const passengers = useMemo(() => {
    return passengerInformation.passengers.filter(
      (passenger) => passenger.type !== PASSENGER_TYPE.INFANT
    );
  }, [flightBookingInfo]);

  const handleSelectSeat = (
    direction: FLIGHT_DIRECTION,
    {
      passenger,
      seatOpt,
    }: { passenger: PassengerBookingInformationType; seatOpt: ISeatOption },
    onNextPassenger?: () => void
  ) => {
    let seatsSelected: ISeatSeledtedItem[] = [];
    if (direction === FLIGHT_DIRECTION.DEPARTURE) {
      const seatsSelectedDeparture = seatSelected.flightDepart || [];
      const seatSelect = seatsSelectedDeparture.find(
        (_seat) => _seat.item.selectionKey === seatOpt.selectionKey
      );
      const passengerSelected = seatsSelectedDeparture.find(
        (_pax) => _pax.passenger.index === passenger.index
      );
      if (!seatsSelectedDeparture.length) {
        seatsSelected = [
          { item: seatOpt, passenger: { index: passenger.index } },
        ];
      } else {
        if (!passengerSelected && !seatSelect) {
          seatsSelected = [
            ...seatsSelectedDeparture,
            { item: seatOpt, passenger: { index: passenger.index } },
          ];
        }

        if (passengerSelected && !seatSelect) {
          const paxIndex = seatsSelectedDeparture.findIndex(
            (pax) => pax.passenger.index === passenger.index
          );
          seatsSelected = [...seatsSelectedDeparture];
          seatsSelected.splice(paxIndex, 1, {
            ...passengerSelected,
            item: seatOpt,
          });
        }

        if (passengerSelected && seatSelect) {
          const paxIndex = seatsSelectedDeparture.findIndex(
            (pax) =>
              pax.passenger.index === passenger.index &&
              pax.item.selectionKey === seatSelect.item.selectionKey
          );

          if (paxIndex !== -1) {
            seatsSelected = [...seatsSelectedDeparture];
            seatsSelected.splice(paxIndex, 1);
          } else {
            seatsSelected = [...seatsSelectedDeparture];
          }
        }

        if (!passengerSelected && seatSelect) {
          seatsSelected = [...seatsSelectedDeparture];
        }
      }
      if (!passengerSelected || !seatSelect) {
        onNextPassenger?.();
      }
      onAddSeatToFlightDeparture(seatsSelected);
    }

    if (direction === FLIGHT_DIRECTION.RETURN) {
      const seatsSelectedReturnFlight = seatSelected.flightReturn || [];
      const seatSelect = seatsSelectedReturnFlight.find(
        (_seat) => _seat.item.selectionKey === seatOpt.selectionKey
      );
      const passengerSelected = seatsSelectedReturnFlight.find(
        (_pax) => _pax.passenger.index === passenger.index
      );

      if (!seatsSelectedReturnFlight.length) {
        seatsSelected = [
          { item: seatOpt, passenger: { index: passenger.index } },
        ];
      } else {
        if (!passengerSelected && !seatSelect) {
          seatsSelected = [
            ...seatsSelectedReturnFlight,
            { item: seatOpt, passenger: { index: passenger.index } },
          ];
        }

        if (passengerSelected && !seatSelect) {
          const paxIndex = seatsSelectedReturnFlight.findIndex(
            (pax) => pax.passenger.index === passenger.index
          );
          seatsSelected = [...seatsSelectedReturnFlight];
          seatsSelected.splice(paxIndex, 1, {
            ...passengerSelected,
            item: seatOpt,
          });
        }

        if (passengerSelected && seatSelect) {
          const paxIndex = seatsSelectedReturnFlight.findIndex(
            (pax) =>
              pax.passenger.index === passenger.index &&
              pax.item.selectionKey === seatSelect.item.selectionKey
          );

          if (paxIndex !== -1) {
            seatsSelected = [...seatsSelectedReturnFlight];
            seatsSelected.splice(paxIndex, 1);
          } else {
            seatsSelected = [...seatsSelectedReturnFlight];
          }
        }
        if (!passengerSelected && seatSelect) {
          seatsSelected = [...seatsSelectedReturnFlight];
        }
      }
      if (!passengerSelected || !seatSelect) {
        onNextPassenger?.();
      }
      onAddSeatToFlightReturn(seatsSelected);
    }
  };

  const onNext = () => {
    onAddBookingFlightService(FLIGHT_SERVICES.SEATS, seatSelected);
    if (flightDirection === FLIGHT_DIRECTION.DEPARTURE) {
      setFlightDirection(FLIGHT_DIRECTION.RETURN);
    } else {
      onClose();
      setFlightDirection(FLIGHT_DIRECTION.DEPARTURE);
    }
  };
  const onCancel = () => {
    onClose();
    setFlightDirection(FLIGHT_DIRECTION.DEPARTURE);
  };
  const renderTabSegment = () => {
    if (!flightDepart) {
      return null;
    }
    return (
      <div
        className={classNames({
          "h-20": true,
          flex: flightDepart && flightReturn,
          block: flightDepart || !flightReturn,
        })}
      >
        <div
          className={classNames({
            "flex-1 flex items-center justify-center border-b-4 cursor-pointer":
              true,
            " border-emerald-400 bg-white drop-shadow-xl":
              flightDirection === FLIGHT_DIRECTION.DEPARTURE,
          })}
          onClick={() => setFlightDirection(FLIGHT_DIRECTION.DEPARTURE)}
        >
          <div className="text-center">
            <p>Chuyến đi</p>
            <SegmentType
              departureAirport={flightDepart.ticket.outbound.departureAirport}
              arrivalAirport={flightDepart.ticket.outbound.arrivalAirport}
            />
          </div>
        </div>
        {flightReturn ? (
          <div
            className={classNames({
              "flex-1 flex items-center justify-center border-b-4 cursor-pointer":
                true,
              " border-emerald-400 bg-white drop-shadow-xl":
                flightDirection === FLIGHT_DIRECTION.RETURN,
            })}
            onClick={() => setFlightDirection(FLIGHT_DIRECTION.RETURN)}
          >
            <div className="text-center">
              <p>Chuyến về</p>
              <SegmentType
                departureAirport={flightReturn.ticket.outbound.departureAirport}
                arrivalAirport={flightReturn.ticket.outbound.arrivalAirport}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  const subTotal = useMemo(() => {
    let total = 0;
    if (
      flightDirection === FLIGHT_DIRECTION.DEPARTURE &&
      selectedSeats?.flightDepart
    ) {
      total = selectedSeats.flightDepart.reduce((sum, item) => {
        return sum + item.item.seatCharges[0].currencyAmounts[0].baseAmount;
      }, 0);
    }

    if (
      flightDirection === FLIGHT_DIRECTION.RETURN &&
      selectedSeats?.flightReturn
    ) {
      total = selectedSeats.flightReturn.reduce((sum, item) => {
        return sum + item.item.seatCharges[0].currencyAmounts[0].baseAmount;
      }, 0);
    }

    return total;
  }, [flightDirection, seatSelected]);
  useEffect(() => {
    onInitialServices(FLIGHT_SERVICES.SEATS, selectedSeats);
  }, [onClose]);

  return (
    <Drawler isOpen={isOpen} onClose={onCancel} width="xl">
      <div className="head bg-gray-100 sticky top-0">{renderTabSegment()}</div>
      {flightDirection === FLIGHT_DIRECTION.DEPARTURE ? (
        <SeatSegment
          onSelectSeat={(passenger, seatOpt, callback) =>
            handleSelectSeat(
              FLIGHT_DIRECTION.DEPARTURE,
              { passenger, seatOpt },
              callback
            )
          }
          selectedSeatItems={seatSelected[FLIGHT_DIRECTION.DEPARTURE] || []}
          flightDirection={FLIGHT_DIRECTION.DEPARTURE}
          passengers={passengers}
          airCraftModel="A330"
        />
      ) : null}

      {flightDirection === FLIGHT_DIRECTION.RETURN ? (
        <SeatSegment
          onSelectSeat={(passenger, seatOpt, callback) =>
            handleSelectSeat(
              FLIGHT_DIRECTION.RETURN,
              { passenger, seatOpt },
              callback
            )
          }
          selectedSeatItems={seatSelected[FLIGHT_DIRECTION.RETURN] || []}
          flightDirection={FLIGHT_DIRECTION.RETURN}
          passengers={passengers}
          airCraftModel="A320"
        />
      ) : null}
      <SeatNavigationBar
        subTotal={moneyFormatVND(subTotal)}
        onFinish={onNext}
      />
    </Drawler>
  );
};
export default memo(SeatDrawler);
