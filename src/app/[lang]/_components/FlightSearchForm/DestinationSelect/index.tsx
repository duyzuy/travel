"use client";

import React, { memo, useState, useRef, useCallback } from "react";
import { useQuery } from "@apollo/client";
import classNames from "classnames";
import { useClickOutSide } from "@/hooks/useClickOutSide";
import { AirPortList, IAirPort } from "@/Models/airport";
import { TRIP_DESTINATION } from "@/constants/enum";
import { QUERY_AIRPORT_LIST } from "@/operations/queries/airtPort";

import Input from "@/components/base/Input";
import { IconSwitcher } from "@/components/Icons";
import styles from "./inputRouting.module.scss";
type PropsType = {
  onSelectAirport: (destination: TRIP_DESTINATION, airport: IAirPort) => void;
  onSwapDestination: () => void;
  tripFrom?: IAirPort;
  tripTo?: IAirPort;
};

const DestinationSelect: React.FC<PropsType> = ({
  onSelectAirport,
  onSwapDestination,
  tripFrom,
  tripTo,
}) => {
  const { data, loading, networkStatus } = useQuery<{
    airportList: AirPortList;
  }>(QUERY_AIRPORT_LIST);

  const [destination, setDestination] = useState<
    TRIP_DESTINATION | undefined
  >();
  const [showDropdown, setShowdropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutSide(dropdownRef, () => {
    setDestination(undefined);
    setShowdropdown(false);
  });

  const onClickInputDestination = (tripDestination: TRIP_DESTINATION) => {
    setDestination(tripDestination);
    setShowdropdown(true);
  };

  const onSelectingTripDestination = useCallback(
    (airport: IAirPort) => {
      if (!destination) return;

      onSelectAirport(destination, airport);

      if (destination === TRIP_DESTINATION.TRIP_FROM) {
        setDestination(TRIP_DESTINATION.TRIP_TO);
      }
      if (destination === TRIP_DESTINATION.TRIP_TO) {
        setShowdropdown(false);
        setDestination(undefined);
      }
    },
    [destination]
  );

  return (
    <div
      className={classNames({
        [styles.wrapper]: styles.wrapper,
        relative: true,
      })}
    >
      <div className="flex w-full relative flex-wrap routing-input">
        <Input
          showLabel={false}
          placeholder="Điểm đi"
          label="Điểm đi"
          name="from"
          onClick={() => onClickInputDestination(TRIP_DESTINATION.TRIP_FROM)}
          className={classNames({
            tripFrom: true,
            isSelecting: destination === TRIP_DESTINATION.TRIP_FROM,
          })}
          onChange={() => {}}
          value={
            tripFrom
              ? `${tripFrom.province.provinceName} - ${tripFrom.code}`
              : ""
          }
        />
        <button
          type="button"
          className="absolute rotate-90 switcher z-10 bg-white"
          onClick={onSwapDestination}
        >
          <IconSwitcher width={24} height={24} stroke="#12b981" />
        </button>
        <Input
          showLabel={false}
          placeholder="Điểm đến"
          label="Điểm đến"
          name="to"
          onChange={() => {}}
          className={classNames({
            tripTo: true,
            isSelecting: destination === TRIP_DESTINATION.TRIP_TO,
          })}
          value={
            tripTo ? `${tripTo.province.provinceName} - ${tripTo.code}` : ""
          }
          onClick={() => onClickInputDestination(TRIP_DESTINATION.TRIP_TO)}
        />
      </div>
      {showDropdown ? (
        <div
          className={classNames({
            "shadow-md border border-gray-300 absolute airport-list": true,
            [styles.airportList]: styles.airportList,
          })}
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
      ) : null}
    </div>
  );
};
export default memo(DestinationSelect);
