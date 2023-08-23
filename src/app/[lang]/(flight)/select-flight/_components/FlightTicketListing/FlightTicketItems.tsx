"use client";

import React, { memo, useMemo } from "react";

import FlightTicketItem from "@/components/Flights/FlightTicketItem";
import { FlightTicket } from "@/Models/flight/ticket";
import { DEPARTURE_TIMES, SORTS_ENUM } from "@/cache/vars";
import { useReactiveVar } from "@apollo/client";
import { Airline } from "@/Models/flight/airline";
import { flightsFilterVar } from "@/cache/vars";

const BookingFlightItems: React.FC<{
  flightTickets: FlightTicket[];
  airlines: Airline[];
  ticketIdSelected?: string;

  onSelectFlight: ({
    ticket,
    otherTickets,
  }: {
    ticket: FlightTicket;
    otherTickets: FlightTicket[];
  }) => void;
}> = ({ flightTickets, airlines, ticketIdSelected, onSelectFlight }) => {
  const filter = useReactiveVar(flightsFilterVar);

  const flightItemsFilter = useMemo(() => {
    const { brands, departTimes, sorting } = filter;

    //   filter by group
    const restFlightItems: FlightTicket[] = [];

    const flightNumbersUnique: string[] = [];
    const uniqueFlights = flightTickets.filter((item) => {
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
      tid: FlightTicket["tid"];
      outbound: FlightTicket["outbound"];
      childs: FlightTicket[];
    }[] = [];

    let uniqueFlightsWithChilds = uniqueFlights.reduce((acc, _tkItem) => {
      const childs = restFlightItems.filter((childItem, childInd) => {
        if (childItem.outbound.flightNumber === _tkItem.outbound.flightNumber) {
          restFlightItems.splice(childInd, 1);
          return true;
        } else {
          return false;
        }
      });

      return [...acc, { ..._tkItem, childs: [_tkItem, ...childs] }];
    }, initFlightWithChilds);

    /**
     * Brand filter
     */
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

    /**
     * Times filter
     */
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
      case SORTS_ENUM.EARLY: {
        uniqueFlightsWithChilds.sort(
          (a, b) => a.outbound.departureTime - b.outbound.departureTime
        );
        break;
      }
      case SORTS_ENUM.FASTEST: {
        uniqueFlightsWithChilds.sort(
          (a, b) => a.outbound.duration - b.outbound.duration
        );
        break;
      }
      case SORTS_ENUM.LOWEST: {
        uniqueFlightsWithChilds.sort(
          (a, b) =>
            a.outbound.ticketdetail.farePrice -
            b.outbound.ticketdetail.farePrice
        );
        break;
      }
    }

    return uniqueFlightsWithChilds;
  }, [filter, flightTickets]);

  return (
    <div className="flight-items">
      {flightItemsFilter.map((ticket) => (
        <FlightTicketItem
          ticketInfo={ticket.outbound}
          key={ticket.tid}
          onSelectFlight={() =>
            onSelectFlight({
              ticket: { tid: ticket.tid, outbound: ticket.outbound },
              otherTickets: ticket.childs,
            })
          }
          isSelected={ticketIdSelected === ticket.tid}
          airlines={airlines}
        />
      ))}
    </div>
  );
};
export default memo(BookingFlightItems);
