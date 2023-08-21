"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import AirCraftSeatNotes from "@/components/Flights/AirCraftModel/AirCraftSeatNotes";
import PassengerList from "@/components/PassengerList";
import SeatMapA320 from "../SeatMapModel/SeatMapA320";
import SeatMapA321 from "../SeatMapModel/SeatMapA321";
import SeatMapA330 from "../SeatMapModel/SeatMapA330";
import classNames from "classnames";
const SeatMapBooking: React.FC = () => {
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

  return (
    <>
      <div
        className={classNames({
          "seat-selection-top px-3 py-2 lg:px-6 lg:py-4 top-0 z-50 bg-white":
            true,
          "sticky top-0 shadow-lg": isSticky,
          relative: !isSticky,
        })}
        ref={paxSeatNoteRef}
      >
        <PassengerList className="mb-4" />
        <AirCraftSeatNotes isSticky={isShort} />
      </div>
      <div className="flex top-0 z-50 -mt-52 justify-center bg-white">
        {/* <PassengerList className="mb-4 w-64" type="vertical" /> */}
        <SeatMapA330 />
        {/* <SeatMapA321 />
        <SeatMapA320 /> */}
        {/* <AirCraftSeatNotes
          isSticky={isShort}
          type="vertical"
          className="w-64"
        /> */}
      </div>
    </>
  );
};
export default memo(SeatMapBooking);
