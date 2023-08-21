"use client";
import SingleDatePiker from "@/components/SingleDatePiker";
import styles from "./selectFlight.module.scss";
import FlightSortingTicket from "./_components/FlightSortingTicket";
import FlightTicketFilter from "./_components/FlightTicketFilter";
import FlightSectors from "./_components/FlightSectors";
import { useApolloClient } from "@apollo/client";
import { WRITE_FLIGHT_OPTIONS } from "@/cache/wtire/flightOptions";
import { FLIGHT_OPTIONS_2 } from "../../flightOptionsData2";
import { FLIGHT_OPTIONS } from "../../flightOptionsData";

import FlightItems from "./_components/FlightItems";

import { TripType } from "@/constants/enum";
const SearchFlightPage = () => {
  const client = useApolloClient();

  client.writeQuery({
    query: WRITE_FLIGHT_OPTIONS,
    data: {
      flightOptions: FLIGHT_OPTIONS_2,
    },
  });

  return (
    <div className={styles.wrapper}>
      <div className="container mx-auto">
        <div className="select-flight-trip py-6 flex items-center gap-x-3">
          <FlightSectors tripType={TripType.ROUND_TRIP} />
        </div>
        <div className="selection-flight flex justify-between align-baseline items-start pt-6">
          <FlightTicketFilter />
          <div className="select-flight-right flex-1 pl-6">
            <div className="select-calendar mb-4">
              <SingleDatePiker />
            </div>
            <FlightSortingTicket />
            <FlightItems />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchFlightPage;
