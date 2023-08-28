"use client";

import React, { useEffect, useState, useRef } from "react";
import { useApolloClient } from "@apollo/client";
import { SEAT_MAP_A320, SEAT_MAP_A321, SEAT_MAP_A330 } from "./datavj";
import { WRITE_SEAT_MAP } from "@/cache/wtire";
import FlightSectors from "@/components/Flights/FlightSectors";
import SeatBookingNavigation from "./_components/SeatBookingNavigation";
import PassengerBoxList from "@/components/PassengerBoxList";
import SeatMapA320 from "./_components/SeatMapModel/SeatMapA320";
import AirCraftSeatNotes from "@/components/Flights/AirCraftModel/AirCraftSeatNotes";
import classNames from "classnames";
const SeatSelectionPage = ({ params }: { params: { lang: string } }) => {
  const client = useApolloClient();
  const paxSeatNoteRef = useRef<HTMLDivElement>(null);

  const [isSticky, setSticky] = useState(false);
  const [isShort, setShort] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      if (!paxSeatNoteRef.current) return;

      const windowScrollY = window.scrollY;
      const elmShouldSticky =
        paxSeatNoteRef.current.getBoundingClientRect().top;

      if (elmShouldSticky <= 0) {
        setSticky(() => true);
      } else {
        setSticky(() => false);
        setShort(() => false);
      }

      if (windowScrollY > 450) {
        setShort(() => true);
      }
    };

    window.addEventListener("scroll", handleWindowScroll);

    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  client.writeQuery({
    query: WRITE_SEAT_MAP,
    data: {
      seatMapModel: {
        model: "A330",
        id: "A330",
        ...SEAT_MAP_A330,
        __typename: "airCraftModel",
      },
    },
    variables: {
      model: "A330",
    },
  });
  client.writeQuery({
    query: WRITE_SEAT_MAP,
    data: {
      seatMapModel: {
        model: "A321",
        id: "A321",
        ...SEAT_MAP_A321,
        __typename: "airCraftModel",
      },
    },
    variables: {
      model: "A321",
    },
  });
  client.writeQuery({
    query: WRITE_SEAT_MAP,
    data: {
      seatMapModel: {
        model: "A320",
        id: "A320",
        ...SEAT_MAP_A320,
        __typename: "airCraftModel",
      },
    },
    variables: {
      model: "A320",
    },
  });
  return (
    <div className="container mx-auto">
      <div className="page-head py-6 flex items-center justify-between">
        <h1 className="text-2xl">Lựa chọn ghế ngồi</h1>
        <span className="text-sm text-emerald-500">Bỏ qua chọn ghế</span>
      </div>
      <div className="page-body relative overflow-clip">
        <FlightSectors style={{ top: 1 }} />
        <div className="relative z-50">
          <div
            className={classNames({
              "seat-selection-top px-3 py-2 lg:px-6 lg:py-4 top-0 z-50 bg-white":
                true,
              "sticky top-0 shadow-lg": isSticky,
              relative: !isSticky,
            })}
            ref={paxSeatNoteRef}
          >
            <PassengerBoxList className="mb-4" passengers={[]} />
            <AirCraftSeatNotes isSticky={isShort} spacing="md" />
          </div>
          <div className="flex top-0 z-50 -mt-52 justify-center bg-white">
            <SeatMapA320 />
          </div>
          <SeatBookingNavigation />
        </div>
      </div>
    </div>
  );
};
export default SeatSelectionPage;
