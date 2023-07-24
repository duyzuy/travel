"use client";

import React, { memo, useState, useRef, useCallback } from "react";

import { AirCraftRightIcon, SwitcherIcon } from "@/assets/icons";
import Image from "next/image";
import { useClickOutSide } from "@/hooks/useClickOutSide";
import { AirPortList, IAirPort } from "@/Models/airport";
import { LocationIcon } from "@/assets/icons";
import { useBookingInformation } from "@/hooks/useBooking";
import { useQuery } from "@apollo/client";
import { QUERY_AIRPORT_LIST } from "@/operations/queries/airtPort";
import { bookingInformationVar } from "@/cache/vars";
import Input from "@/components/Input";
import { TripDestination } from "@/Models/booking";
import { useReactiveVar } from "@apollo/client";
import classNames from "classnames";
import styles from "./inputRouting.module.scss";
type PropsType = {
  onSelectAirport?: () => void;
};

const InputRouting: React.FC<PropsType> = () => {
  const { data, loading, networkStatus } = useQuery<{
    airportList: AirPortList;
  }>(QUERY_AIRPORT_LIST);

  const [destination, setDestination] = useState<{
    selecting: TripDestination | null;
  }>({
    selecting: null,
  });
  const [showDropdown, setShowdropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { tripFrom, tripTo } = useReactiveVar(bookingInformationVar);
  const {
    operations: { selectTripDestination, onSwapDestination },
  } = useBookingInformation(bookingInformationVar);

  useClickOutSide(dropdownRef, () => {
    setDestination({ selecting: null });
    setShowdropdown(false);
  });

  const onClickInputDestination = (tripDestination: TripDestination) => {
    setDestination({ selecting: tripDestination });
    setShowdropdown(true);
  };
  const onSelectingTripDestination = useCallback(
    (airport: IAirPort) => {
      if (destination.selecting === null) return;
      selectTripDestination(destination.selecting, airport);

      if (destination.selecting === TripDestination.TRIP_FROM) {
        setDestination({ selecting: TripDestination.TRIP_TO });
      }
      if (destination.selecting === TripDestination.TRIP_TO) {
        setShowdropdown(false);
        setDestination({ selecting: null });
      }
    },
    [destination]
  );

  return (
    <div className={styles.wrapper + " relative"}>
      <div className="flex w-full relative flex-wrap routing-input">
        <Input
          iconPath={AirCraftRightIcon}
          showLabel={false}
          placeholder="Điểm đi"
          label="Điểm đi"
          name="from"
          onClick={() => onClickInputDestination(TripDestination.TRIP_FROM)}
          className={classNames({
            tripFrom: true,
            isSelecting: destination.selecting === TripDestination.TRIP_FROM,
          })}
          onChange={() => {}}
          value={
            (tripFrom &&
              `${tripFrom.province.provinceName} - ${tripFrom.code}`) ||
            ""
          }
        />
        <button
          type="button"
          className="absolute rotate-90 switcher z-10"
          onClick={onSwapDestination}
        >
          <Image src={SwitcherIcon} alt="switcher" width={24} height={24} />
        </button>
        <Input
          iconPath={LocationIcon}
          showLabel={false}
          placeholder="Điểm đến"
          label="Điểm đến"
          name="to"
          onChange={() => {}}
          className={classNames({
            tripTo: true,
            isSelecting: destination.selecting === TripDestination.TRIP_TO,
          })}
          value={
            (tripTo && `${tripTo.province.provinceName} - ${tripTo.code}`) || ""
          }
          onClick={() => onClickInputDestination(TripDestination.TRIP_TO)}
        />
      </div>
      {(showDropdown && (
        <div
          className={
            styles.airportList + " shadow-md border border-gray-300 absolute"
          }
          ref={dropdownRef}
        >
          <div className="wrapper ">
            <ul className="airport-list-item">
              {data &&
                data.airportList.map((airportItem) => (
                  <li
                    className="item flex items-center justify-between px-4 py-2 bg-white hover:bg-gray-100 cursor-pointer"
                    key={airportItem.id}
                    onClick={() => onSelectingTripDestination(airportItem)}
                  >
                    <p className="airport-city-name">
                      <span className="city block">
                        {airportItem.province.provinceName}
                      </span>
                      <span className="airport block text-sm text-gray-500">
                        {airportItem.name}
                      </span>
                    </p>
                    <span className="airport-code font-bold">
                      {airportItem.code}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )) || <></>}
    </div>
  );
};
export default memo(InputRouting);
