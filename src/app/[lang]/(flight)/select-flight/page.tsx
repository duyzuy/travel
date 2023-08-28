"use client";
import { useCallback, useMemo, useState } from "react";
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
import { useRouter } from "next/navigation";
import { FlightTicket } from "@/Models/flight/ticket";
import { useQuery } from "@apollo/client";
import { IFlightOptions } from "@/Models/flight/flightOptions";
import { GET_FLIGHT_OPTIONS } from "@/operations/queries/flightOptions";
import {
  durationToString,
  getProvinceName,
  getOperationFromFlightNumber,
} from "@/helpers/flightItem";
import styles from "./selectFlight.module.scss";

const SearchFlightPage = ({ params }: { params: { lang: string } }) => {
  const client = useApolloClient();
  client.writeQuery({
    query: WRITE_FLIGHT_OPTIONS,
    data: {
      flightOptions: FLIGHT_OPTIONS_2,
    },
  });

  const router = useRouter();
  const { flightBookingInfo, onSelectFlight } = useBookingFlightInfo(
    bookingInformationVar
  );
  const { data, loading } = useQuery<{
    flightOptions: IFlightOptions;
  }>(GET_FLIGHT_OPTIONS);
  const [segment, setSegment] = useState(FLIGHT_DIRECTION.DEPARTURE);
  const flightOptions = useMemo(() => {
    return data?.flightOptions;
  }, [data]);

  const bookingInformation = useMemo(() => {
    return flightBookingInfo.bookingInfo;
  }, [flightBookingInfo]);

  const flightDepartSelected = useMemo(() => {
    return flightBookingInfo.flightDepart;
  }, [flightBookingInfo]);

  const flightReturnSelected = useMemo(() => {
    return flightBookingInfo.flightReturn;
  }, [flightBookingInfo]);

  const [showDrawlerConfirm, setShowDrawler] = useState(false);

  const handleSelectFlight = useCallback(
    (
      direction: DIRECTION,
      {
        ticket,
        otherTickets,
      }: { ticket: FlightTicket; otherTickets: FlightTicket[] }
    ) => {
      if (
        !bookingInformation.tripType ||
        !bookingInformation.departDate ||
        !bookingInformation.tripFrom ||
        !bookingInformation.tripTo
      ) {
        return;
      }

      onSelectFlight(direction, { ticket, otherTickets });

      if (bookingInformation.tripType === TRIP_TYPE.ROUND_TRIP) {
        if (!flightDepartSelected) {
          setSegment(FLIGHT_DIRECTION.RETURN);
        } else {
          setShowDrawler(true);
        }
      } else {
        setShowDrawler(true);
      }
    },
    [flightDepartSelected, bookingInformation, flightReturnSelected]
  );

  const handleNext = () => {
    router.push("./passenger");
    setShowDrawler(false);
  };

  const onChangeSegment = (flightSegment: FLIGHT_DIRECTION) => {
    if (!flightDepartSelected) {
      return;
    }
    setSegment(flightSegment);
  };
  const flightSelectedInformation = (flightDirection: FLIGHT_DIRECTION) => {
    const flightSelectedData =
      flightDirection === FLIGHT_DIRECTION.DEPARTURE
        ? flightDepartSelected
        : flightReturnSelected;
    if (!flightOptions || !flightSelectedData) {
      return;
    }
    const {
      ticket: { outbound },
    } = flightSelectedData;
    return {
      thumbnailUrl: getOperationFromFlightNumber(
        flightOptions.airlines,
        outbound.flightNumber
      )?.logo,
      flightNumber: outbound.flightNumber,
      departureTime: outbound.departureTimeStr,
      departureCode: outbound.departureAirport,
      arrivalCode: outbound.arrivalAirport,
      arrivalTime: outbound.arrivalTimeStr,
      operationName:
        (flightOptions &&
          flightBookingInfo[flightDirection] &&
          getOperationFromFlightNumber(
            flightOptions.airlines,
            outbound.flightNumber
          )?.name) ||
        "",
      durationTime:
        (flightBookingInfo[flightDirection] &&
          durationToString(outbound.duration)) ||
        "",

      flightTypeName: "",
      isDirectFlight: outbound.ticketdetail.numStops === 0,
      departDate: outbound.departureDayStr,
      fareClassName: outbound.ticketdetail.ticketClassCode,
    };
  };

  if (loading) {
    return <>loading.....</>;
  }
  return (
    <div className={styles.wrapper}>
      <div className="container mx-auto">
        <div className="select-flight-trip py-6 flex gap-x-3">
          <FlightSectorItem
            labelText="Chuyến đi"
            depart={getProvinceName(bookingInformation.tripFrom)}
            arrival={getProvinceName(bookingInformation.tripTo)}
            departDate={
              (bookingInformation &&
                bookingInformation.departDate &&
                format(bookingInformation.departDate.date, FORMAT_DATE_LONG, {
                  locale: vi,
                })) ||
              ""
            }
            flightDirection={FLIGHT_DIRECTION.DEPARTURE}
            status={
              (segment === FLIGHT_DIRECTION.DEPARTURE &&
                SECTOR_STATUS.IN_PROCESS) ||
              SECTOR_STATUS.WAITING
            }
            flightSelectedInfo={flightSelectedInformation(
              FLIGHT_DIRECTION.DEPARTURE
            )}
            onClick={() => onChangeSegment(FLIGHT_DIRECTION.DEPARTURE)}
          />
          {bookingInformation.tripType === TRIP_TYPE.ROUND_TRIP ? (
            <FlightSectorItem
              labelText="Chuyến về"
              depart={getProvinceName(bookingInformation.tripTo)}
              arrival={getProvinceName(bookingInformation.tripFrom)}
              departDate={
                (bookingInformation &&
                  bookingInformation.returnDate &&
                  format(bookingInformation.returnDate.date, FORMAT_DATE_LONG, {
                    locale: vi,
                  })) ||
                ""
              }
              flightDirection={FLIGHT_DIRECTION.RETURN}
              status={
                (segment === FLIGHT_DIRECTION.RETURN &&
                  SECTOR_STATUS.IN_PROCESS) ||
                SECTOR_STATUS.WAITING
              }
              flightSelectedInfo={flightSelectedInformation(
                FLIGHT_DIRECTION.RETURN
              )}
              onClick={() => onChangeSegment(FLIGHT_DIRECTION.RETURN)}
            />
          ) : null}
        </div>
        <div className="selection-flight flex justify-between align-baseline items-start pt-6">
          <FlightTicketFilter />
          <div className="select-flight-right flex-1 pl-6">
            <SingleDatePiker />
            <div className="mb-4"></div>
            <FlightSortingTicket />
            {flightOptions ? (
              <FlightTicketListing
                onSelectFlight={handleSelectFlight}
                direction={
                  (segment === FLIGHT_DIRECTION.DEPARTURE &&
                    DIRECTION.OUT_BOUND) ||
                  DIRECTION.IN_BOUND
                }
                flightOptions={flightOptions}
              />
            ) : (
              <>Data not found</>
            )}
          </div>
        </div>

        <TicketConfirmationDrawler
          flightDepart={flightDepartSelected}
          flightReturn={flightReturnSelected}
          isOpen={showDrawlerConfirm}
          onNext={handleNext}
          onChangeTicket={() => {}}
          onCancel={() => setShowDrawler(false)}
        />
      </div>
    </div>
  );
};
export default SearchFlightPage;
