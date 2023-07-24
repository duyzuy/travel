"use client";

import React, { memo, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { HOT_TICKES_FLIGHTS } from "./flightListing";
import { WRITE_HOT_FLIGHTS_TICKET } from "@/cache/wtire/hotFlightTicket";
import HotFlightsTicket from "./HotFlightsTicket";

import { useQuery } from "@apollo/client";
import { GET_HOT_FLIGHTS_TICKET } from "@/operations/queries/hotflights";
import {
  TypeAirLine,
  TypeAirportItem,
  TypeHotTickets,
} from "@/Models/hotFlight";

type TypeHotTicketFlight = {
  hotFlightsTicket: {
    airlines: TypeAirLine[];
    airports: TypeAirportItem[];
    hotTickets: TypeHotTickets;
  };
};

const PromotedFlights = () => {
  const client = useApolloClient();

  const [airlinesSelection, setAirlineSelections] = useState({
    current: "",
    options: {},
  });
  client.writeQuery({
    query: WRITE_HOT_FLIGHTS_TICKET,
    data: {
      hotFlightsTicket: { ...HOT_TICKES_FLIGHTS },
    },
  });

  const { data, error, loading } = useQuery<TypeHotTicketFlight>(
    GET_HOT_FLIGHTS_TICKET
  );

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {(data && (
        <section className="promote-section">
          <HotFlightsTicket
            airlines={data.hotFlightsTicket.airlines}
            airports={data.hotFlightsTicket.airports}
            hotTickets={data.hotFlightsTicket.hotTickets}
          />
        </section>
      )) || <> </>}
    </>
  );
};
export default memo(PromotedFlights);
