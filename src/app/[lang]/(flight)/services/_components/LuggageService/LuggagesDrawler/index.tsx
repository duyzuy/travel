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
  ILuggageSelectedItem,
} from "@/modules/bookingServices/bookingServices.interface";
import useSelectServices from "@/modules/bookingServices/useSelectServices";
import { useBookingFlightInfo } from "@/modules/bookingTicket/useBookingFlightInfo";
import { useQuery } from "@apollo/client";
import { QUERY_ANCILLARY } from "@/operations/queries/ancillary";
import {
  DIRECTION,
  FLIGHT_DIRECTION,
  PASSENGER_TYPE,
  TRIP_TYPE,
} from "@/constants/enum";
import { IMealOption } from "@/Models/flight/meal";
import { ILuggage } from "@/Models/flight/luggage";
import { moneyFormatVND } from "@/utils/helper";
interface ILuggagesDrawler {
  isOpen: boolean;
  onClose: () => void;
  selectedLuggages: IBookingServices["luggages"];
}

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

  const { data, loading } = useQuery<{
    ancillaries: {
      cityPare: string;
      meals: IMealOption[];
      luggages: ILuggage[];
    };
  }>(QUERY_ANCILLARY, {
    variables: { cityPare: "SGN-HAN" },
  });

  const handleSelectLuggage = (
    direction: FLIGHT_DIRECTION,
    { item, passengerIndex }: { item: ILuggage; passengerIndex: number }
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
              luggage.item.key === item.key &&
              luggage.passenger.index === passengerSelected.passenger.index
          );

          if (itemSelected) {
            //remove item
            const indexItem = luggagesSelectedDepart.findIndex(
              (item) =>
                item.item.key === itemSelected.item.key &&
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
              luggage.item.key === item.key &&
              luggage.passenger.index === passengerSelected.passenger.index
          );

          if (itemSelected) {
            //remove item
            const indexItem = luggagesSelectedReturn.findIndex(
              (item) =>
                item.item.key === itemSelected.item.key &&
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

  const subTotal = useMemo(() => {
    let total = 0;
    if (luggagesSelectedDepart) {
      total = luggagesSelectedDepart.reduce((sum, item) => {
        return (
          sum + item.item.ancillaryCharges[0].currencyAmounts[0].baseAmount
        );
      }, 0);
    }

    if (luggagesSelectedReturn) {
      total =
        total +
        luggagesSelectedReturn.reduce((sum, item) => {
          return (
            sum + item.item.ancillaryCharges[0].currencyAmounts[0].baseAmount
          );
        }, 0);
    }

    return total;
  }, [luggagesSelectedReturn, luggagesSelectedDepart]);

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
          {flightDepart && data ? (
            <LuggageSegment
              label="Chuyến đi"
              direction={FLIGHT_DIRECTION.DEPARTURE}
              departure={flightDepart.ticket.outbound.departureCity}
              departureCode={flightDepart.ticket.outbound.departureAirport}
              arrival={flightDepart.ticket.outbound.arrivalCity}
              arrivalCode={flightDepart.ticket.outbound.arrivalAirport}
              items={data.ancillaries.luggages}
              selectedItems={luggagesSelectedDepart || []}
              passengers={passengers}
              onSelectItem={(item: ILuggage, passengerIndex: number) =>
                handleSelectLuggage(FLIGHT_DIRECTION.DEPARTURE, {
                  item,
                  passengerIndex,
                })
              }
            />
          ) : null}

          {flightReturn &&
          data &&
          bookingInfo.tripType === TRIP_TYPE.ROUND_TRIP ? (
            <LuggageSegment
              label="Chuyến về"
              direction={FLIGHT_DIRECTION.RETURN}
              departure={flightReturn.ticket.outbound.departureCity}
              departureCode={flightReturn.ticket.outbound.departureAirport}
              arrival={flightReturn.ticket.outbound.arrivalCity}
              arrivalCode={flightReturn.ticket.outbound.arrivalAirport}
              items={data.ancillaries.luggages}
              passengers={passengers}
              selectedItems={luggagesSelectedReturn || []}
              onSelectItem={(item: ILuggage, passengerIndex: number) =>
                handleSelectLuggage(FLIGHT_DIRECTION.RETURN, {
                  item,
                  passengerIndex,
                })
              }
            />
          ) : null}
        </div>
      </div>
      <LuggageNavigationBar
        subTotal={moneyFormatVND(subTotal)}
        onFinish={onConfirmSelection}
      />
    </Drawler>
  );
};
export default memo(LuggagesDrawler);
