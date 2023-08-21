"use client";
import { useCallback } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { useApolloClient } from "@apollo/client";
import { WRITE_FLIGHT_OPTIONS } from "@/cache/wtire/flightOptions";
import { FLIGHT_OPTIONS_2 } from "../../flightOptionsData2";
import { FLIGHT_OPTIONS } from "../../flightOptionsData";

import { FORMAT_DATE_LONG } from "@/constants/config";
import { Direction, FlightDirection, TripType } from "@/constants/enum";
import { useBookingFlightInfo } from "@/modules/bookingTicket/useBookingFlightInfo";
import { bookingInformationVar } from "@/cache/vars";
import {
  SECTOR_STATUS,
  FLIGHT_DIRECTION,
} from "@/components/Flights/FlightSectorItem";
import FlightSectorItem from "@/components/Flights/FlightSectorItem";
import SingleDatePiker from "@/components/base/SingleDatePiker";
import FlightSortingTicket from "./_components/FlightSortingTicket";
import FlightTicketFilter from "./_components/FlightTicketFilter";
import FlightTicketListing from "./_components/FlightTicketListing";

import { FlightDetailItemType } from "@/Models/ticket";

import {
  durationToString,
  getProvinceName,
  getOperationFromFlightNumber,
} from "@/helpers/flightItem";
import styles from "./selectFlight.module.scss";
import { isEmpty } from "@/utils/helper";

const SearchFlightPage = () => {
  const client = useApolloClient();

  const { flightBookingInfo, onSelectFlight, doSearchFlight } =
    useBookingFlightInfo(bookingInformationVar);

  client.writeQuery({
    query: WRITE_FLIGHT_OPTIONS,
    data: {
      flightOptions: FLIGHT_OPTIONS_2,
    },
  });

  const handleSelectFlight = useCallback(
    (
      direction: Direction,
      { tid, outbound }: { tid: string; outbound: FlightDetailItemType }
    ) => {
      onSelectFlight(direction, { tid, outbound });
    },
    [flightBookingInfo]
  );
  const { data, loading } = doSearchFlight();

  // const departFlightSelectedInfo = useCallback(
  //   (flightDirection: FlightDirection) => {
  //     if (!data || !flightBookingInfo[flightDirection]) {
  //       return;
  //     }
  //     if (!flightBookingInfo) {
  //       return;
  //     }
  //     return {
  //       thumbnailUrl: getOperationFromFlightNumber(
  //         data.flightOptions.airlines,
  //         flightBookingInfo[flightDirection].outbound.flightNumber
  //       )?.logo,
  //       flightNumber:
  //         flightBookingInfo[flightDirection]?.outbound.flightNumber || "",
  //       departureTime:
  //         flightBookingInfo[flightDirection]?.outbound.departureTimeStr || "",
  //       departureCode:
  //         flightBookingInfo[flightDirection]?.outbound.departureAirport || "",
  //       arrivalCode:
  //         flightBookingInfo[flightDirection]?.outbound.arrivalAirport || "",
  //       arrivalTime:
  //         flightBookingInfo[flightDirection]?.outbound.arrivalTimeStr || "",
  //       operationName:
  //         (data &&
  //           flightBookingInfo[flightDirection] &&
  //           getOperationFromFlightNumber(
  //             data.flightOptions.airlines,
  //             flightBookingInfo[flightDirection]?.outbound.flightNumber
  //           )?.name) ||
  //         "",
  //       durationTime:
  //         (flightBookingInfo[flightDirection] &&
  //           durationToString(
  //             flightBookingInfo[flightDirection]?.outbound.duration
  //           )) ||
  //         "",

  //       flightTypeName: "",
  //       isDirectFlight:
  //         flightBookingInfo[flightDirection]?.outbound.ticketdetail.numStops ===
  //         0,
  //       departDate:
  //         flightBookingInfo[flightDirection]?.outbound.departureDayStr || "",
  //       fareClassName:
  //         flightBookingInfo[flightDirection]?.outbound.ticketdetail
  //           .ticketClassCode || "",
  //     };
  //   },
  //   [handleSelectFlight]
  // );
  return (
    <div className={styles.wrapper}>
      <div className="container mx-auto">
        <div className="select-flight-trip py-6 flex gap-x-3">
          <FlightSectorItem
            labelText="Chuyến đi"
            depart={getProvinceName(flightBookingInfo.bookingInfo.tripFrom)}
            arrival={getProvinceName(flightBookingInfo.bookingInfo.tripTo)}
            departDate={
              (flightBookingInfo.bookingInfo &&
                flightBookingInfo.bookingInfo.departDate &&
                format(
                  flightBookingInfo.bookingInfo.departDate.date,
                  FORMAT_DATE_LONG,
                  { locale: vi }
                )) ||
              ""
            }
            flightDirection={FLIGHT_DIRECTION.DEPARTURE}
            status={
              (!flightBookingInfo.flightDepart && SECTOR_STATUS.IN_PROCESS) ||
              (flightBookingInfo.flightDepart && SECTOR_STATUS.SELECTED) ||
              SECTOR_STATUS.WAITING
            }
            flightInfo={{
              thumbnailUrl:
                data &&
                flightBookingInfo.flightDepart &&
                getOperationFromFlightNumber(
                  data.flightOptions.airlines,
                  flightBookingInfo.flightDepart?.outbound.flightNumber
                )?.logo,
              flightNumber:
                flightBookingInfo.flightDepart?.outbound.flightNumber || "",
              departureTime:
                flightBookingInfo.flightDepart?.outbound.departureTimeStr || "",
              departureCode:
                flightBookingInfo.flightDepart?.outbound.departureAirport || "",
              arrivalCode:
                flightBookingInfo.flightDepart?.outbound.arrivalAirport || "",
              arrivalTime:
                flightBookingInfo.flightDepart?.outbound.arrivalTimeStr || "",
              operationName:
                (data &&
                  flightBookingInfo.flightDepart &&
                  getOperationFromFlightNumber(
                    data.flightOptions.airlines,
                    flightBookingInfo.flightDepart?.outbound.flightNumber
                  )?.name) ||
                "",
              durationTime:
                (flightBookingInfo.flightDepart &&
                  durationToString(
                    flightBookingInfo.flightDepart?.outbound.duration
                  )) ||
                "",

              flightTypeName: "",
              isDirectFlight:
                flightBookingInfo.flightDepart?.outbound.ticketdetail
                  .numStops === 0,
              departDate:
                flightBookingInfo.flightDepart?.outbound.departureDayStr || "",
              fareClassName:
                flightBookingInfo.flightDepart?.outbound.ticketdetail
                  .ticketClassCode || "",
            }}
          />
          {flightBookingInfo.bookingInfo.tripType === TripType.ROUND_TRIP ? (
            <FlightSectorItem
              labelText="Chuyến về"
              depart={getProvinceName(flightBookingInfo.bookingInfo.tripFrom)}
              arrival={getProvinceName(flightBookingInfo.bookingInfo.tripTo)}
              departDate={
                (flightBookingInfo.bookingInfo &&
                  flightBookingInfo.bookingInfo.returnDate &&
                  format(
                    flightBookingInfo.bookingInfo.returnDate.date,
                    FORMAT_DATE_LONG,
                    { locale: vi }
                  )) ||
                ""
              }
              flightDirection={FLIGHT_DIRECTION.RETURN}
              status={
                (flightBookingInfo.flightDepart &&
                  !flightBookingInfo.flightReturn &&
                  SECTOR_STATUS.IN_PROCESS) ||
                (flightBookingInfo.flightReturn && SECTOR_STATUS.SELECTED) ||
                SECTOR_STATUS.WAITING
              }
              flightInfo={{
                thumbnailUrl:
                  data &&
                  flightBookingInfo.flightReturn &&
                  getOperationFromFlightNumber(
                    data.flightOptions.airlines,
                    flightBookingInfo.flightReturn?.outbound.flightNumber
                  )?.logo,
                flightNumber:
                  flightBookingInfo.flightReturn?.outbound.flightNumber || "",
                departureTime:
                  flightBookingInfo.flightReturn?.outbound.departureTimeStr ||
                  "",
                departureCode:
                  flightBookingInfo.flightReturn?.outbound.departureAirport ||
                  "",
                arrivalCode:
                  flightBookingInfo.flightReturn?.outbound.arrivalAirport || "",
                arrivalTime:
                  flightBookingInfo.flightReturn?.outbound.arrivalTimeStr || "",
                operationName:
                  (data &&
                    flightBookingInfo.flightReturn &&
                    getOperationFromFlightNumber(
                      data.flightOptions.airlines,
                      flightBookingInfo.flightReturn?.outbound.flightNumber
                    )?.name) ||
                  "",
                durationTime:
                  (flightBookingInfo.flightReturn &&
                    durationToString(
                      flightBookingInfo.flightReturn?.outbound.duration
                    )) ||
                  "",

                flightTypeName: "",
                isDirectFlight:
                  flightBookingInfo.flightReturn?.outbound.ticketdetail
                    .numStops === 0,
                departDate:
                  flightBookingInfo.flightReturn?.outbound.departureDayStr ||
                  "",
                fareClassName:
                  flightBookingInfo.flightReturn?.outbound.ticketdetail
                    .ticketClassCode || "",
              }}
            />
          ) : null}
        </div>
        <div className="selection-flight flex justify-between align-baseline items-start pt-6">
          <FlightTicketFilter />
          <div className="select-flight-right flex-1 pl-6">
            <SingleDatePiker />
            <div className="mb-4"></div>
            <FlightSortingTicket />
            {(data && (
              <FlightTicketListing
                onSelectFlight={handleSelectFlight}
                direction={
                  (flightBookingInfo.flightDepart && Direction.IN_BOUND) ||
                  Direction.OUT_BOUND
                }
                flightOptions={data.flightOptions}
              />
            )) || <>Data not found</>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchFlightPage;
