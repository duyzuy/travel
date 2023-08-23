"use client";
import React, { memo } from "react";
import PassengerSelect from "@/components/PassengerSelect";
import { PAX_TYPE } from "@/constants/enum";
import { ISearchFlightForm } from "@/Models";
interface Props {
  onSelectPassenger: (passengers: ISearchFlightForm["passengers"]) => void;
  passengers: ISearchFlightForm["passengers"];
  variant?: "text" | "field";
}

const PassengerFlightSelect: React.FC<Props> = ({
  onSelectPassenger,
  passengers,
  variant,
}) => {
  const { adult, children, infant } = passengers;
  const onSelectPassengerFlight = (
    paxType: PAX_TYPE,
    { action, value }: { action: "minus" | "plus"; value: number }
  ) => {
    const MAXIMUM_PAX_AMOUNT = 9;

    console.log(passengers);
    let passengersData = {
      adult,
      infant,
      children,
    };
    switch (paxType) {
      case PAX_TYPE.ADULT: {
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
      case PAX_TYPE.CHILDREN: {
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
      case PAX_TYPE.INFANT: {
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
