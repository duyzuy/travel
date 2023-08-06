"use client";
import SingleDatePiker from "@/components/SingleDatePiker";
import styles from "./selectFlight.module.scss";
import FlightShortingItems from "@/components/FlightShortingItems";
import FlightFilteringItems from "@/components/FlightFilteringItems";
import FlightSector from "./components/FlightSector";
import { useApolloClient } from "@apollo/client";
import { WRITE_FLIGHT_OPTIONS } from "@/cache/wtire/flightOptions";
import { FLIGHT_OPTIONS_2 } from "../../flightOptionsData2";
import { FLIGHT_OPTIONS } from "../../flightOptionsData";

import FlightItems from "./components/FlightItems";
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
          {/* <FlightSector /> */}
          <div className="sector-label">
            <p className="mb-2">
              <span className="text-white bg-emerald-400 px-2 py-1 rounded-sm text-sm">
                Chuyến đi
              </span>
            </p>
            <p className="text-xl uppercase flex items-center">
              <span>Tp. Hồ Chí Minh (SGN) </span>
              <span className="icon mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </span>
              <span>Hà Nội (HAN)</span>
            </p>
          </div>
        </div>
        <div className="selection-flight flex justify-between align-baseline items-start pt-6">
          <FlightFilteringItems />
          <div className="select-flight-right flex-1 pl-6">
            <div className="select-calendar mb-4">
              <SingleDatePiker />
            </div>
            <FlightShortingItems />
            <FlightItems />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchFlightPage;
