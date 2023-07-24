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
      <div className="bg-emerald-600 py-6">
        <div className="container mx-auto">
          <div className="select-flight-information">
            <p className="round-trip flex items-center text-white">
              <span className="depart-name">TP Hồ Chí Minh (SGN)</span>
              <span className="trip-type mx-2">
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
              <span className="depart-name">Hà Nội (HAN)</span>
            </p>
            <p className="trip-info text-sm text-white">
              <span>Khứ hồi</span>
              <span className="mx-3">Thứ 3, 15 tháng 8</span>
              <span>1 người lớn, 1 trẻ em</span>
            </p>
          </div>
        </div>
      </div>
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
