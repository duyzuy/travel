"use client";

import React, { memo, useCallback, useMemo } from "react";

import FlightItem from "../FlightItem";
import { FlightDetailItemType } from "@/Models/ticket";
import {
  BRANDS,
  DEPARTURE_TIMES,
  FILTER_KEYS,
  SHORTINGS,
  bookingInformationVar,
} from "@/cache/vars";
import { useReactiveVar } from "@apollo/client";
import useSelectFlight from "@/hooks/useSelectFlight";
import { Direction } from "@/Models/booking";
import { Airline, Airlines } from "@/Models/airline";
import { flightsFilterVar } from "@/cache/vars";
export type OnSelectFlightType = ({
  direction,
  ticket,
}: {
  direction: Direction;
  ticket: { tid: string; outbound: FlightDetailItemType };
}) => void;

const BookingFlightItems: React.FC<{
  flightItems: { tid: string; outbound: FlightDetailItemType }[];
  direction: Direction;
  airlines: Airlines;
}> = ({ flightItems, direction, airlines }) => {
  const bookingInformation = useReactiveVar(bookingInformationVar);

  const filter = useReactiveVar(flightsFilterVar);
  const { onSelectFlight } = useSelectFlight(bookingInformationVar);

  const handleSelectFlight: OnSelectFlightType = useCallback(
    ({ direction, ticket }) => {
      onSelectFlight({
        direction,
        ticket,
      });
    },
    []
  );

  const flightItemsFilter = useMemo(() => {
    let filterOutput = [...flightItems];
    const { brands, departTimes, sorting } = filter;

    //filter by brand
    if (brands.length > 0) {
      filterOutput = filterOutput.filter((item) => {
        let itemExists = false;
        brands.forEach((branItem) => {
          if (item.outbound.flightNumber.includes(branItem)) {
            itemExists = true;
            return;
          }
        });
        return itemExists;
      });
    }

    //filter by depart time
    if (departTimes.length > 0) {
      filterOutput = filterOutput.filter((item) => {
        let itemValid = false;
        const departHour = new Date(item.outbound.departureTime).getHours();
        departTimes.forEach((dpT) => {
          switch (dpT) {
            case DEPARTURE_TIMES.EARLY_MORNING: {
              if (0 <= departHour && departHour < 6) {
                itemValid = true;
              }
              break;
            }
            case DEPARTURE_TIMES.MONRNING: {
              if (6 <= departHour && departHour < 12) {
                itemValid = true;
              }
              break;
            }
            case DEPARTURE_TIMES.AFTERNOON: {
              if (12 <= departHour && departHour < 18) {
                itemValid = true;
              }
              break;
            }
            case DEPARTURE_TIMES.NIGHT: {
              if (18 <= departHour && departHour < 24) {
                itemValid = true;
              }
              break;
            }
          }
        });
        return itemValid;
      });
    }

    // sorting items
    switch (sorting) {
      case SHORTINGS.EARLY: {
        filterOutput.sort(
          (a, b) => a.outbound.departureTime - b.outbound.departureTime
        );
        break;
      }
      case SHORTINGS.FASTEST: {
        filterOutput.sort((a, b) => a.outbound.duration - b.outbound.duration);
        break;
      }
      case SHORTINGS.LOWEST: {
        filterOutput.sort(
          (a, b) =>
            a.outbound.ticketdetail.farePrice -
            b.outbound.ticketdetail.farePrice
        );
        break;
      }
    }
    return filterOutput;
  }, [filter]);

  const getBrandNameFromFlightNumber = useCallback((flightCode: string) => {
    return airlines.find((item) => flightCode.includes(item.code));
  }, []);

  return (
    <div className="flight-items">
      {flightItemsFilter.map((ticket) => {
        return (
          <FlightItem
            flightItemData={ticket.outbound}
            key={ticket.tid}
            direction={Direction.OUT_BOUND}
            tid={ticket.tid}
            onSelectFlight={handleSelectFlight}
            isSelected={
              bookingInformation.flightItems[direction]?.tid === ticket.tid
            }
            airline={getBrandNameFromFlightNumber(ticket.outbound.flightNumber)}
          />
        );
      })}
    </div>
  );
};
export default memo(BookingFlightItems);
