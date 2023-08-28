"use client";
import Drawler from "@/components/base/Drawler";
import React, { memo, useEffect, useMemo } from "react";
import { selectingServicesVar } from "@/cache/vars";

import LuggageSegment from "./LuggageSegment";
import LuggageNavigationBar from "./LuggageNavigationBar";
import { bookingInformationVar } from "@/cache/vars";
import {
  FLIGHT_SERVICES,
  IBookingServices,
  ILuggageOption,
  ILuggageSelectedItem,
} from "@/modules/bookingServices/bookingServices.interface";
import useSelectServices from "@/modules/bookingServices/useSelectServices";
import { useBookingFlightInfo } from "@/modules/bookingTicket/useBookingFlightInfo";
import {
  DIRECTION,
  FLIGHT_DIRECTION,
  PASSENGER_TYPE,
  TRIP_TYPE,
} from "@/constants/enum";
interface ILuggagesDrawler {
  isOpen: boolean;
  onClose: () => void;
  selectedLuggages: IBookingServices["luggages"];
}
const LUGGAGE_ITEMS: ILuggageOption[] = [
  {
    id: "luggage-1",
    name: "30kg",
    baseAmount: 150000,
    discountAmount: 120000,
    taxAmount: 15000,
  },
  {
    id: "luggage-2",
    name: "40kg",
    baseAmount: 250000,
    discountAmount: 220000,
    taxAmount: 25000,
  },

  {
    id: "luggage-3",
    name: "50kg",
    baseAmount: 350000,
    discountAmount: 320000,
    taxAmount: 35000,
  },

  {
    id: "luggage-4",
    name: "60kg",
    baseAmount: 450000,
    discountAmount: 420000,
    taxAmount: 45000,
  },

  {
    id: "luggage-5",
    name: "70kg",
    baseAmount: 550000,
    discountAmount: 520000,
    taxAmount: 55000,
  },
];

const LuggagesDrawler: React.FC<ILuggagesDrawler> = ({
  isOpen,
  onClose,
  selectedLuggages,
}) => {
  const { flightBookingInfo: bookingInformation, onAddBookingFlightService } =
    useBookingFlightInfo(bookingInformationVar);
  const {
    onAddLuggageItemsToFlightDeparture,
    onAddLuggageItemsToFlightReturn,
    onInitLuggages,
    selectedServices,
  } = useSelectServices(selectingServicesVar);
  const { passengerInformation, flightDepart, flightReturn, bookingInfo } =
    bookingInformation;

  const passengers = useMemo(() => {
    return passengerInformation.passengers.filter(
      (passenger) => passenger.type !== PASSENGER_TYPE.INFANT
    );
  }, [bookingInformation]);

  const luggagesSelectedDepart = useMemo(() => {
    return selectedServices.luggages.flightDepart;
  }, [selectedServices]);
  const luggagesSelectedReturn = useMemo(() => {
    return selectedServices.luggages.flightReturn;
  }, [selectedServices]);

  const handleSelectLuggage = (
    direction: FLIGHT_DIRECTION,
    { item, passengerIndex }: { item: ILuggageOption; passengerIndex: number }
  ) => {
    let luggageItems: ILuggageSelectedItem[] = [];

    if (direction === FLIGHT_DIRECTION.DEPARTURE) {
      if (!luggagesSelectedDepart || !luggagesSelectedDepart.length) {
        luggageItems = [{ item: item, passenger: { index: passengerIndex } }];
      } else {
        //check items exists

        const passengerSelected = luggagesSelectedDepart.find(
          (item) => item.passenger.index === passengerIndex
        );
        if (!passengerSelected) {
          luggageItems = [
            ...luggagesSelectedDepart,
            { item: item, passenger: { index: passengerIndex } },
          ];
        } else {
          const itemSelected = luggagesSelectedDepart.find(
            (luggage) =>
              luggage.item.id === item.id &&
              luggage.passenger.index === passengerSelected.passenger.index
          );

          if (itemSelected) {
            //remove item
            const indexItem = luggagesSelectedDepart.findIndex(
              (item) =>
                item.item.id === itemSelected.item.id &&
                item.passenger.index === itemSelected.passenger.index
            );
            luggageItems = [...luggagesSelectedDepart];
            luggageItems.splice(indexItem, 1);
          } else {
            //change item
            luggageItems = [...luggagesSelectedDepart];

            const passengerIndex = luggagesSelectedDepart.findIndex(
              (item) =>
                item.passenger.index === passengerSelected.passenger.index
            );
            luggageItems.splice(passengerIndex, 1, {
              ...passengerSelected,
              item: { ...item },
            });
          }
        }
      }
      onAddLuggageItemsToFlightDeparture(luggageItems);
    }

    if (direction === FLIGHT_DIRECTION.RETURN) {
      if (!luggagesSelectedReturn || !luggagesSelectedReturn.length) {
        luggageItems = [{ item: item, passenger: { index: passengerIndex } }];
      } else {
        //check items exists

        const passengerSelected = luggagesSelectedReturn.find(
          (item) => item.passenger.index === passengerIndex
        );
        if (!passengerSelected) {
          luggageItems = [
            ...luggagesSelectedReturn,
            { item: item, passenger: { index: passengerIndex } },
          ];
        } else {
          const itemSelected = luggagesSelectedReturn.find(
            (luggage) =>
              luggage.item.id === item.id &&
              luggage.passenger.index === passengerSelected.passenger.index
          );

          if (itemSelected) {
            //remove item
            const indexItem = luggagesSelectedReturn.findIndex(
              (item) =>
                item.item.id === itemSelected.item.id &&
                item.passenger.index === itemSelected.passenger.index
            );
            luggageItems = [...luggagesSelectedReturn];
            luggageItems.splice(indexItem, 1);
          } else {
            //change item
            luggageItems = [...luggagesSelectedReturn];

            const passengerIndex = luggagesSelectedReturn.findIndex(
              (item) =>
                item.passenger.index === passengerSelected.passenger.index
            );
            luggageItems.splice(passengerIndex, 1, {
              ...passengerSelected,
              item: { ...item },
            });
          }
        }
      }
      onAddLuggageItemsToFlightReturn(luggageItems);
    }
  };

  const onConfirmSelection = () => {
    onAddBookingFlightService(
      FLIGHT_SERVICES.LUGGAGES,
      selectedServices.luggages
    );
    onClose();
  };
  const onCancel = () => {
    onInitLuggages(selectedLuggages);
    onClose();
  };
  useEffect(() => {
    onInitLuggages(selectedLuggages);
  }, []);
  return (
    <Drawler isOpen={isOpen} onClose={onCancel} width="xl">
      <div
        className="lugggage-container"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="luggage-items relative z-10 bg-white">
          {flightDepart ? (
            <LuggageSegment
              label="Chuyến đi"
              direction={FLIGHT_DIRECTION.DEPARTURE}
              departure={flightDepart.ticket.outbound.departureCity}
              departureCode={flightDepart.ticket.outbound.departureAirport}
              arrival={flightDepart.ticket.outbound.arrivalCity}
              arrivalCode={flightDepart.ticket.outbound.arrivalAirport}
              items={LUGGAGE_ITEMS}
              selectedItems={luggagesSelectedDepart || []}
              passengers={passengers}
              onSelectItem={(item: ILuggageOption, passengerIndex: number) =>
                handleSelectLuggage(FLIGHT_DIRECTION.DEPARTURE, {
                  item,
                  passengerIndex,
                })
              }
            />
          ) : null}

          {flightReturn && bookingInfo.tripType === TRIP_TYPE.ROUND_TRIP ? (
            <LuggageSegment
              label="Chuyến về"
              direction={FLIGHT_DIRECTION.RETURN}
              departure={flightReturn.ticket.outbound.departureCity}
              departureCode={flightReturn.ticket.outbound.departureAirport}
              arrival={flightReturn.ticket.outbound.arrivalCity}
              arrivalCode={flightReturn.ticket.outbound.arrivalAirport}
              items={LUGGAGE_ITEMS}
              passengers={passengers}
              selectedItems={luggagesSelectedReturn || []}
              onSelectItem={(item: ILuggageOption, passengerIndex: number) =>
                handleSelectLuggage(FLIGHT_DIRECTION.RETURN, {
                  item,
                  passengerIndex,
                })
              }
            />
          ) : null}
        </div>
      </div>
      <LuggageNavigationBar onFinish={onConfirmSelection} />
    </Drawler>
  );
};
export default memo(LuggagesDrawler);
