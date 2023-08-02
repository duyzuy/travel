"use client";

import React, { memo, useEffect, useState, useRef } from "react";
import FlightInformationDetail from "@/components/FlightInformationDetail";
import FlightPriceTicketDetail from "@/components/FlightPriceTicketDetail";
import Button from "@/components/Button";
import { FlightDetailItemType } from "@/Models/ticket";
import CollapseContent from "@/components/CollapseContent";
import { OnSelectFlightType } from "./FlightItems/BookingFlightItems";
import { Direction } from "@/constants/enum";
const FlightItemPanelAndSubmit: React.FC<{
  data: FlightDetailItemType;
  onSelectFlight: OnSelectFlightType;
  direction: Direction;
  tid: string;
}> = ({ onSelectFlight, data, direction, tid }) => {
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
                className="btn py-2 cursor-pointer hover:text-emerald-600 relative mr-6"
                onClick={() => handleShowPanel("flightInfor")}
              >
                <span>Thông tin chuyến bay</span>
                {(showPanel.flightInfor && (
                  <span className="absolute -bottom-2 w-12 h-1 block bg-emerald-600 rounded-tl rounded-tr panel-active"></span>
                )) || <></>}
              </li>
              <li className="btn cursor-pointer hover:text-emerald-600 relative py-2">
                <span onClick={() => handleShowPanel("ticketDetail")}>
                  Chi tiết giá vé
                </span>
                {(showPanel.ticketDetail && (
                  <span className="absolute -bottom-2 w-12 h-1 block bg-emerald-600 rounded-tl rounded-tr panel-active"></span>
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
                  onSelectFlight({
                    direction: direction,
                    ticket: { tid: tid, outbound: data },
                  })
                }
              >
                Chọn
              </Button>
            </div>
          </div>
          <CollapseContent isOpen={showPanel.flightInfor}>
            <FlightInformationDetail isOpen={true} />
          </CollapseContent>
          <CollapseContent isOpen={showPanel.ticketDetail}>
            <FlightPriceTicketDetail isOpen={true} />
          </CollapseContent>
        </div>
      </div>
    </>
  );
};
export default memo(FlightItemPanelAndSubmit);
