"use client";
import Drawler from "@/components/base/Drawler";
import React, { memo, useMemo, useState } from "react";
import { selectingServicesVar } from "@/cache/vars";
import { useReactiveVar } from "@apollo/client";
import MealNavigationBar from "./MealNavigationBar";
import { bookingInformationVar } from "@/cache/vars";
import { IMealOption } from "@/Models/flight/meal";
import useSelectServices from "@/modules/bookingServices/useSelectServices";
import { ILuggage } from "@/Models/flight/luggage";
import { QUERY_ANCILLARY } from "@/operations/queries/ancillary";
import { useQuery } from "@apollo/client";
import classNames from "classnames";
import SegmentType from "@/components/Flights/SegmentType";
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

const MealDrawler: React.FC<IMealDrawler> = ({ isOpen, onClose }) => {
  const [flightDirection, setFlightDirection] = useState(
    FLIGHT_DIRECTION.DEPARTURE
  );
  const bookingInformation = useReactiveVar(bookingInformationVar);

  const { selectedServices } = useSelectServices(selectingServicesVar);
  const { passengerInformation, flightDepart, flightReturn, bookingInfo } =
    bookingInformation;

  const mealSelectedDepart = useMemo(() => {
    return selectedServices.meals.flightDepart;
  }, [selectedServices]);
  const mealSelectedReturn = useMemo(() => {
    return selectedServices.meals.flightReturn;
  }, [selectedServices]);
  const passengers = useMemo(() => {
    return passengerInformation.passengers.filter(
      (passenger) => passenger.type !== PASSENGER_TYPE.INFANT
    );
  }, [bookingInformation]);

  const { data, loading } = useQuery<{
    ancillaries: {
      cityPare: string;
      meals: IMealOption[];
      luggages: ILuggage[];
    };
  }>(QUERY_ANCILLARY, {
    variables: { cityPare: "SGN-HAN" },
  });

  const onNext = () => {};
  const onCancel = () => {
    onClose();
  };
  const handleSelectMeal = (
    direction: FLIGHT_DIRECTION,
    {
      item,
      passenger,
      quantity,
    }: { item: IMealOption; passenger: { index: number }; quantity: number }
  ) => {
    console.log(direction, item, quantity);
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
  if (loading) {
    return <>....loading</>;
  }
  return (
    <Drawler isOpen={isOpen} onClose={onCancel} width="sm">
      <div className="head bg-gray-100 sticky top-0">{renderTabSegment()}</div>
      <div className="meal-container min-h-screen">
        {flightDirection === FLIGHT_DIRECTION.DEPARTURE && data ? (
          <MealSegment
            mealList={data.ancillaries.meals}
            direction={FLIGHT_DIRECTION.DEPARTURE}
            passengers={passengers}
            onSelectedMeal={({ item, passenger, quantity }) =>
              handleSelectMeal(FLIGHT_DIRECTION.DEPARTURE, {
                item,
                passenger,
                quantity,
              })
            }
            mealSelectedItems={mealSelectedDepart || []}
          />
        ) : null}

        {flightDirection === FLIGHT_DIRECTION.RETURN && data ? (
          <MealSegment
            mealList={data.ancillaries.meals}
            direction={FLIGHT_DIRECTION.RETURN}
            passengers={passengers}
            onSelectedMeal={() => {}}
            mealSelectedItems={mealSelectedReturn || []}
          />
        ) : null}
      </div>
      <MealNavigationBar onFinish={onNext} />
    </Drawler>
  );
};
export default memo(MealDrawler);
