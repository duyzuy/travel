"use client";
import SingleDatePiker from "@/components/SingleDatePiker";
import styles from "./selectFlight.module.scss";
import FlightShortingItems from "@/components/FlightShortingItems";
import FlightFilteringItems from "@/components/FlightFilteringItems";
import BookingFlightSearchForm from "../../components/BookingFlightSearchForm";
import FlightSector from "./components/FlightSector";
import { useApolloClient } from "@apollo/client";
import { WRITE_FLIGHT_OPTIONS } from "@/cache/wtire/flightOptions";
import { FLIGHT_OPTIONS } from "../../flightOptionsData";
import FlightItems from "./components/FlightItems";
import BookingInformationHeaderBar from "@/components/BookingInformationHeaderBar";
const SearchFlightPage = () => {
  const client = useApolloClient();

  client.writeQuery({
    query: WRITE_FLIGHT_OPTIONS,
    data: {
      flightOptions: FLIGHT_OPTIONS,
    },
  });

  return (
    <div className={styles.wrapper}>
      <div className="container mx-auto">
        <div className="select-flight-form bg-white py-6 px-4 shadow-sm rounded-sm mt-4">
          <BookingFlightSearchForm showRecent={false} />
        </div>
        <div className="select-flight-trip py-6 flex items-center gap-x-3">
          <FlightSector />
        </div>
        <div className="selection-flight flex justify-between align-baseline items-start">
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
