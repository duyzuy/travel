"use client";

import React, { memo, useCallback, useMemo, useState } from "react";

import FlightTicketItem from "@/components/Flights/FlightTicketItem";
import { FlightDetailItemType } from "@/Models/ticket";
import { DEPARTURE_TIMES, SORTS_ENUM } from "@/cache/vars";
import { useReactiveVar } from "@apollo/client";
import { Airlines } from "@/Models/airline";
import { flightsFilterVar } from "@/cache/vars";
import FlightItemTicketsModal from "@/app/[lang]/(flight)/select-flight/_components/FlightItemTicketsModal";
import { useModal } from "@/hooks/useModal";
import { flightItemTicketModalVar } from "@/cache/vars";
import { moneyFormatVND } from "@/utils/helper";
import { getOperationFromFlightNumber } from "@/helpers/flightItem";
const BookingFlightItems: React.FC<{
  flightTickets: { tid: string; outbound: FlightDetailItemType }[];

  airlines: Airlines;
  ticketId?: string;
  onSelectFlight: ({
    tid,
    outbound,
  }: {
    tid: string;
    outbound: FlightDetailItemType;
  }) => void;
}> = ({ flightTickets, airlines, ticketId, onSelectFlight }) => {
  const [tickets, setTickets] = useState<{
    data: { tid: string; outbound: FlightDetailItemType };
    childs: { tid: string; outbound: FlightDetailItemType }[];
  }>();
  const { onShowModal } = useModal(flightItemTicketModalVar);

  const filter = useReactiveVar(flightsFilterVar);

  const onSelectFlightTicketWithChilds = ({
    tid,
    outbound,
    otherTickets,
  }: {
    tid: string;
    outbound: FlightDetailItemType;
    otherTickets: { tid: string; outbound: FlightDetailItemType }[];
  }) => {
    setTickets(() => ({
      data: {
        tid,
        outbound,
      },
      childs: otherTickets,
    }));
    onShowModal();
    onSelectFlight({
      tid,
      outbound,
    });
  };

  const flightItemsFilter = useMemo(() => {
    const { brands, departTimes, sorting } = filter;

    //   filter by group
    const restFlightItems: {
      tid: string;
      outbound: FlightDetailItemType;
    }[] = [];

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
          flightItemData={ticket.outbound}
          key={ticket.tid}
          tid={ticket.tid}
          onSelectFlight={() =>
            onSelectFlightTicketWithChilds({
              tid: ticket.tid,
              outbound: ticket.outbound,
              otherTickets: ticket.childs,
            })
          }
          isSelected={ticketId === ticket.tid}
          operation={getOperationFromFlightNumber(
            airlines,
            ticket.outbound.flightNumber
          )}
          flightNumber={ticket.outbound.flightNumber}
          price={moneyFormatVND(ticket.outbound.ticketdetail.farePrice)}
          airlines={airlines}
        />
      ))}
      {tickets && (
        <FlightItemTicketsModal data={tickets.data} childs={tickets.childs} />
      )}
    </div>
  );
};
export default memo(BookingFlightItems);
