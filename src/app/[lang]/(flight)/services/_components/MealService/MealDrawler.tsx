"use client";
import Drawler from "@/components/base/Drawler";
import React, { memo, useMemo } from "react";
import { selectingServicesVar, showModalLuggageVar } from "@/cache/vars";
import { useModal } from "@/hooks/useModal";
import { useReactiveVar } from "@apollo/client";
import MealNavigationBar from "./MealNavigationBar";
import { bookingInformationVar } from "@/cache/vars";
import {
  ILuggageOption,
  ILuggageSelectedItem,
} from "@/modules/bookingServices/bookingServices.interface";
import useSelectServices from "@/modules/bookingServices/useSelectServices";

import {
  DIRECTION,
  FLIGHT_DIRECTION,
  PASSENGER_TYPE,
  TRIP_TYPE,
} from "@/constants/enum";
import MealSegment from "./MealSegment";
interface IMealDrawler {
  isOpen: boolean;
  onClose: () => void;
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

const MealDrawler: React.FC<IMealDrawler> = ({ isOpen, onClose }) => {
  const isShowLuggage = useReactiveVar(showModalLuggageVar);
  const { onCloseModal } = useModal(showModalLuggageVar);

  const bookingInformation = useReactiveVar(bookingInformationVar);

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

  const handleSelectLuggage = (
    direction: FLIGHT_DIRECTION,
    { item, passengerIndex }: { item: ILuggageOption; passengerIndex: number }
  ) => {};

  const onNext = () => {};
  const onCancel = () => {
    onInitLuggages({});
    onClose();
  };
  return (
    <Drawler isOpen={isOpen} onClose={onCancel} width="xl">
      <div className="meal-container min-h-screen">
        <div className="luggage-items relative z-10 bg-white">
          {flightDepart ? <MealSegment /> : null}

          {flightReturn && bookingInfo.tripType === TRIP_TYPE.ROUND_TRIP ? (
            <MealSegment />
          ) : null}
        </div>
      </div>
      <MealNavigationBar onFinish={onNext} />
    </Drawler>
  );
};
export default memo(MealDrawler);
