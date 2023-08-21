"use client";

import React, { memo, useEffect, useState, useRef } from "react";
import FlightInformationDetail from "@/components/Flights/FlightInformationDetail";
import Button from "@/components/base/Button";
import { FlightDetailItemType } from "@/Models/ticket";
import CollapseContent from "@/components/CollapseContent";

import { Direction } from "@/constants/enum";
import { Airlines } from "@/Models";
const FlightTicketItemAction: React.FC<{
  data: FlightDetailItemType;
  onSelectFlight: (
    direction: Direction,
    {
      ticket: { tid, outbound },
      otherTickets: [],
    }: {
      ticket: { tid: string; outbound: FlightDetailItemType };
      otherTickets: { tid: string; outbound: FlightDetailItemType }[];
    }
  ) => void;
  direction: Direction;
  tid: string;
  airlines: Airlines;
}> = ({ onSelectFlight, data, direction, tid, airlines }) => {
  const [showPanel, setShowPanel] = useState({
    ticketDetail: false,
    flightInfor: false,
  });

  const handleShowPanel = (panel: "ticketDetail" | "flightInfor") => {
    let resKey = panel === "ticketDetail" ? "flightInfor" : "ticketDetail";

    setShowPanel((prev) => ({
      ...prev,
      [resKey]: false,
      [panel]: !prev[panel],
    }));
  };

  return (
    <>
      <div className="flight-item-bottom">
        <div className="inner">
          <div className="flex items-center justify-between px-4 py-2">
            <ul className="action flex items-center text-sm text-gray-600">
              <li
                className="btn py-2 cursor-pointer hover:text-emerald-500 relative mr-6"
                onClick={() => handleShowPanel("flightInfor")}
              >
                <span>Thông tin chuyến bay</span>
                {(showPanel.flightInfor && (
                  <span className="absolute -bottom-2 w-12 h-1 block bg-emerald-500 rounded-tl rounded-tr panel-active"></span>
                )) || <></>}
              </li>
            </ul>
            <div className="flight-actions text-right">
              <Button
                color="secondary"
                size="sm"
                className="w-24 lg:text-sm"
                rounded="sm"
                onClick={() =>
                  onSelectFlight(direction, { tid: tid, outbound: data })
                }
              >
                Chọn
              </Button>
            </div>
          </div>
          <CollapseContent isOpen={showPanel.flightInfor}>
            <FlightInformationDetail
              isOpen={true}
              data={data}
              airlines={airlines}
              className="border-t"
            />
          </CollapseContent>
        </div>
      </div>
    </>
  );
};
export default memo(FlightTicketItemAction);
