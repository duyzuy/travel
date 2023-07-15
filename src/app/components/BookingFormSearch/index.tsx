"use client";
import React, { memo } from "react";

import { useReactiveVar, gql, useApolloClient } from "@apollo/client";
import { bookingInformationVar } from "./operations/vars";

import BookingMultipleForm from "@/components/BookingMultipleForm";
import { useBookingInformation } from "@/hooks/useBooking";
import { AIRPORT_LIST } from "@/components/BookingMultipleForm/airportList";

// import { WTIRE_AIRPORT_LIST } from "./operations/write";
const BookingFormSearch: React.FC = () => {
  const bookingInformation = useReactiveVar(bookingInformationVar);
  const client = useApolloClient();

  const {
    operations: { changeTripType },
  } = useBookingInformation(bookingInformationVar);
  const WRITE_AIRPORTLIST = gql`
    query WriteAirportList {
      airportList
    }
  `;
  client.writeQuery({
    query: WRITE_AIRPORTLIST,
    data: {
      // Contains the data to write
      airportList: [...AIRPORT_LIST],
    },
    variables: {
      airport: "list",
    },
  });
  const onSelectDate = () => {};

  return (
    <>
      {bookingInformation && (
        <BookingMultipleForm
          bookingInformation={bookingInformation}
          onChangeTripType={changeTripType}
          onSelectDate={onSelectDate}
        />
      )}
    </>
  );
};
export default memo(BookingFormSearch);
