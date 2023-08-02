"use client";

import React, { memo, useCallback, useMemo } from "react";

import FlightItem from "../FlightItem";
import { FlightDetailItemType } from "@/Models/ticket";
import {
  DEPARTURE_TIMES,
  SHORTINGS,
  bookingInformationVar,
} from "@/cache/vars";
import { useReactiveVar } from "@apollo/client";
import useSelectFlight from "@/hooks/useSelectFlight";
import { Direction } from "@/constants/enum";
import { Airlines } from "@/Models/airline";
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

    //   filter by group
    const restFlightItems: {
      tid: string;
      outbound: FlightDetailItemType;
    }[] = [];

    const flightNumbersUnique: string[] = [];
    const uniqueFlights = flightItems.filter((item) => {
      if (
        flightNumbersUnique.length === 0 ||
        !flightNumbersUnique.includes(item.outbound.flightNumber)
      ) {
        flightNumbersUnique.push(item.outbound.flightNumber);
        return true;
      } else {
        restFlightItems.push(item);
        return false;
      }
    });

    const initFlightWithChilds: {
      tid: string;
      outbound: FlightDetailItemType;
      childs: { tid: string; outbound: FlightDetailItemType }[];
    }[] = [];

    let uniqueFlightsWithChilds = uniqueFlights.reduce((acc, item) => {
      const childs = restFlightItems.filter((childItem, childInd) => {
        if (childItem.outbound.flightNumber === item.outbound.flightNumber) {
          restFlightItems.splice(childInd, 1);
          return true;
        } else {
          return false;
        }
      });

      return [...acc, { ...item, childs: childs }];
    }, initFlightWithChilds);

    //filter by brand
    if (brands.length > 0) {
      uniqueFlightsWithChilds = uniqueFlightsWithChilds.filter((item) => {
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
      uniqueFlightsWithChilds = uniqueFlightsWithChilds.filter((item) => {
        const departHour = new Date(item.outbound.departureTime).getHours();
        let itemValid = false;
        departTimes.forEach((dpT) => {
          switch (dpT) {
            case DEPARTURE_TIMES.EARLY_MORNING: {
              if (0 <= departHour && departHour < 6) {
                itemValid = true;
              }
              break;
            }
            case DEPARTURE_TIMES.MORNING: {
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
        uniqueFlightsWithChilds.sort(
          (a, b) => a.outbound.departureTime - b.outbound.departureTime
        );
        break;
      }
      case SHORTINGS.FASTEST: {
        uniqueFlightsWithChilds.sort(
          (a, b) => a.outbound.duration - b.outbound.duration
        );
        break;
      }
      case SHORTINGS.LOWEST: {
        uniqueFlightsWithChilds.sort(
          (a, b) =>
            a.outbound.ticketdetail.farePrice -
            b.outbound.ticketdetail.farePrice
        );
        break;
      }
    }

    return uniqueFlightsWithChilds;
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
            oneStop={ticket.outbound.ticketdetail.numStops === 0}
            // childs={ticket.childs}
            airline={getBrandNameFromFlightNumber(ticket.outbound.flightNumber)}
          />
        );
      })}
    </div>
  );
};
export default memo(BookingFlightItems);
