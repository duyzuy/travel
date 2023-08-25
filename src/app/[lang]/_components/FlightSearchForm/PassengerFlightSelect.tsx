"use client";
import React, { memo } from "react";
import PassengerSelect from "@/components/PassengerSelect";
import { PASSENGER_TYPE } from "@/constants/enum";
import { SearchBookingFormValue } from "@/modules/bookingTicket/searchBookingForm.interface";
interface Props {
  onSelectPassenger: (passengers: SearchBookingFormValue["passengers"]) => void;
  passengers: SearchBookingFormValue["passengers"];
  variant?: "text" | "field";
}

const PassengerFlightSelect: React.FC<Props> = ({
  onSelectPassenger,
  passengers,
  variant,
}) => {
  const { adult, children, infant } = passengers;
  const onSelectPassengerFlight = (
    paxType: PASSENGER_TYPE,
    { action, value }: { action: "minus" | "plus"; value: number }
  ) => {
    const MAXIMUM_PAX_AMOUNT = 9;

    let passengersData = {
      adult,
      infant,
      children,
    };
    switch (paxType) {
      case PASSENGER_TYPE.ADULT: {
        if (
          action === "plus" &&
          adult.amount + children.amount < MAXIMUM_PAX_AMOUNT
        ) {
          passengersData = {
            ...passengersData,
            adult: { amount: value },
          };
        }
        if (
          action === "minus" &&
          adult.amount > 1 &&
          adult.amount > infant.amount
        ) {
          passengersData = {
            ...passengersData,
            adult: { amount: value },
          };
        }
        if (
          action === "minus" &&
          adult.amount > 1 &&
          adult.amount <= infant.amount
        ) {
          passengersData = {
            ...passengersData,
            adult: { amount: value },
            infant: { amount: value },
          };
        }
        break;
      }
      case PASSENGER_TYPE.CHILDREN: {
        if (
          action === "plus" &&
          children.amount + adult.amount < MAXIMUM_PAX_AMOUNT
        ) {
          passengersData = {
            ...passengersData,
            children: { amount: value },
          };
        }

        if (action === "minus" && children.amount > 0) {
          passengersData = {
            ...passengersData,
            children: { amount: value },
          };
        }
        break;
      }
      case PASSENGER_TYPE.INFANT: {
        if (action === "plus" && adult.amount > infant.amount) {
          passengersData = {
            ...passengersData,
            infant: { amount: value },
          };
        }

        if (action === "minus" && infant.amount > 0) {
          passengersData = {
            ...passengersData,
            infant: { amount: value },
          };
        }
        break;
      }
    }

    onSelectPassenger(passengersData);
  };

  return (
    <PassengerSelect
      infantAmount={infant.amount}
      childrenAmount={children.amount}
      adultAmount={adult.amount}
      onSelectPassenger={onSelectPassengerFlight}
      variant={variant}
    />
  );
};

export default memo(PassengerFlightSelect);
