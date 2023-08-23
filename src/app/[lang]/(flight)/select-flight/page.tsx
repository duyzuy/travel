"use client";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { useApolloClient } from "@apollo/client";
import { WRITE_FLIGHT_OPTIONS } from "@/cache/wtire/flightOptions";
import { bookingInformationVar } from "@/cache/vars";
import { FLIGHT_OPTIONS_2 } from "../../flightOptionsData2";

import { FORMAT_DATE_LONG } from "@/constants/config";
import { DIRECTION, TRIP_TYPE, FLIGHT_DIRECTION } from "@/constants/enum";
import { useBookingFlightInfo } from "@/modules/bookingTicket/useBookingFlightInfo";
import FlightSectorItem, {
  SECTOR_STATUS,
} from "@/components/Flights/FlightSectorItem";
import SingleDatePiker from "@/components/base/SingleDatePiker";
import FlightSortingTicket from "./_components/FlightSortingTicket";
import FlightTicketFilter from "./_components/FlightTicketFilter";
import FlightTicketListing from "./_components/FlightTicketListing";
import TicketConfirmationDrawler from "./_components/TicketConfirmationDrawler";

import { FlightTicket } from "@/Models/flight/ticket";

import {
  durationToString,
  getProvinceName,
  getOperationFromFlightNumber,
} from "@/helpers/flightItem";
import styles from "./selectFlight.module.scss";

const SearchFlightPage = () => {
  const client = useApolloClient();
  client.writeQuery({
    query: WRITE_FLIGHT_OPTIONS,
    data: {
      flightOptions: FLIGHT_OPTIONS_2,
    },
  });

  const { flightBookingInfo, onSelectFlight, doSearchFlight } =
    useBookingFlightInfo(bookingInformationVar);

  const [showDrawlerConfirm, setShowDrawler] = useState(
    (flightBookingInfo.bookingInfo.tripType === TRIP_TYPE.ONEWAY &&
      flightBookingInfo.flightDepart &&
      true) ||
      (flightBookingInfo.bookingInfo.tripType === TRIP_TYPE.ROUND_TRIP &&
        flightBookingInfo.flightDepart &&
        flightBookingInfo.flightReturn &&
        true) ||
      false
  );

  const handleSelectFlight = useCallback(
    (
      direction: DIRECTION,
      {
        ticket,
        otherTickets,
      }: { ticket: FlightTicket; otherTickets: FlightTicket[] }
    ) => {
      if (
        !flightBookingInfo.bookingInfo.tripType ||
        !flightBookingInfo.bookingInfo.departDate ||
        !flightBookingInfo.bookingInfo.tripFrom ||
        !flightBookingInfo.bookingInfo.tripTo
      ) {
        return;
      }

      onSelectFlight(direction, { ticket, otherTickets });
    },
    [flightBookingInfo]
  );

  useEffect(() => {
    if (
      (flightBookingInfo.bookingInfo.tripType === TRIP_TYPE.ONEWAY &&
        flightBookingInfo.flightDepart) ||
      (flightBookingInfo.bookingInfo.tripType === TRIP_TYPE.ROUND_TRIP &&
        flightBookingInfo.flightDepart &&
        flightBookingInfo.flightReturn)
    ) {
      setShowDrawler(true);
    }
  }, [flightBookingInfo]);

  console.log(flightBookingInfo);
  const { data, loading } = doSearchFlight();

  const departFlightSelectedInfo = (flightDirection: FLIGHT_DIRECTION) => {
    const flightSelectedData = flightBookingInfo[flightDirection];
    if (!data || !flightSelectedData) {
      return;
    }
    const {
      ticket: { outbound },
    } = flightSelectedData;
    return {
      thumbnailUrl: getOperationFromFlightNumber(
        data.flightOptions.airlines,
        outbound.flightNumber
      )?.logo,
      flightNumber: outbound.flightNumber || "",
      departureTime: outbound.departureTimeStr || "",
      departureCode: outbound.departureAirport || "",
      arrivalCode: outbound.arrivalAirport || "",
      arrivalTime: outbound.arrivalTimeStr || "",
      operationName:
        (data &&
          flightBookingInfo[flightDirection] &&
          getOperationFromFlightNumber(
            data.flightOptions.airlines,
            outbound.flightNumber
          )?.name) ||
        "",
      durationTime:
        (flightBookingInfo[flightDirection] &&
          durationToString(outbound.duration)) ||
        "",

      flightTypeName: "",
      isDirectFlight: outbound.ticketdetail.numStops === 0,
      departDate: outbound.departureDayStr || "",
      fareClassName: outbound.ticketdetail.ticketClassCode || "",
    };
  };

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
            flightSelectedInfo={departFlightSelectedInfo(
              FLIGHT_DIRECTION.DEPARTURE
            )}
          />
          {flightBookingInfo.bookingInfo.tripType === TRIP_TYPE.ROUND_TRIP ? (
            <FlightSectorItem
              labelText="Chuyến về"
              depart={getProvinceName(flightBookingInfo.bookingInfo.tripTo)}
              arrival={getProvinceName(flightBookingInfo.bookingInfo.tripFrom)}
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
              flightSelectedInfo={departFlightSelectedInfo(
                FLIGHT_DIRECTION.RETURN
              )}
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
                  (flightBookingInfo.flightDepart && DIRECTION.IN_BOUND) ||
                  DIRECTION.OUT_BOUND
                }
                flightOptions={data.flightOptions}
              />
            )) || <>Data not found</>}
          </div>
        </div>

        <TicketConfirmationDrawler
          flightDepart={flightBookingInfo.flightDepart}
          flightReturn={flightBookingInfo.flightReturn}
          isOpen={showDrawlerConfirm}
          onNext={() => {}}
          onChangeTicket={() => {}}
        />
      </div>
    </div>
  );
};
export default SearchFlightPage;
