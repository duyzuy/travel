"use client";

import React, { memo } from "react";
import Button from "@/components/base/Button";
import IconLuggage2 from "@/components/Icons/IconLuggage2";
import IconTicket2 from "@/components/Icons/IconTicket2";
import IconPlaneSeat from "@/components/Icons/IconPlaneSeat";
import { Police } from "@/Models/flight/police";
import classNames from "classnames";
const TicketBox: React.FC<{
  polices?: Police[];
  fareName: string;
  price: string;
  onSelectTicket?: () => void;
  isCurrent?: boolean;
  className?: string;
}> = ({
  polices = [],
  fareName,
  price,
  onSelectTicket,
  isCurrent,
  className = "",
}) => {
  return (
    <div
      className={classNames({
        "ticket max-w-72 px-3": true,
        [className]: className,
      })}
    >
      <div className="ticket-inner p-4 rounded-sm drop-shadow-md bg-white border-t-4 border-t-emerald-400">
        <div className="ticket-head border-b mb-4">
          <div className="ticket-name">
            <p className="text-center">{fareName}</p>
          </div>
          <p className="price px-4 py-2 text-center font-bold text-emerald-400 drop-shadow-sm text-xl">
            {price}
          </p>
        </div>
        {(isCurrent && (
          <div className="ticket-action">
            <Button
              color="secondary"
              size="md"
              fullWidth
              variant="outline"
              rounded="sm"
              className=" font-bold"
              isDisable
            >
              Đang chọn
            </Button>
          </div>
        )) || (
          <div className="ticket-action">
            <Button
              color="secondary"
              size="md"
              fullWidth
              rounded="sm"
              className="drop-shadow-sm font-bold"
              onClick={onSelectTicket}
            >
              Chọn
            </Button>
          </div>
        )}

        <div className="ticket-polices">
          <ul className="py-2">
            {polices.map((pl, ind) => (
              <li
                className={classNames({
                  "flex items-center mb-1 py-2": true,
                  "border-t": ind !== 0,
                })}
                key={`${pl.code}-${ind}`}
              >
                {(pl.code === "LUGGAGE_INFO" && (
                  <IconLuggage2 width={24} height={24} className="mr-2" />
                )) ||
                  ((pl.code === "VOID_TICKET" ||
                    pl.code === "CHANGE_ROUTE") && (
                    <IconTicket2 width={24} height={24} className="mr-2" />
                  )) ||
                  (pl.code === "CHANGE_ROUTE" && (
                    <IconTicket2 width={24} height={24} className="mr-2" />
                  )) ||
                  (pl.code === "OTHERS" && (
                    <IconTicket2 width={24} height={24} className="mr-2" />
                  )) ||
                  (pl.code === "INCLUDED_ANCILLARY" && (
                    <IconPlaneSeat width={24} height={24} className="mr-2" />
                  )) || <IconTicket2 width={24} height={24} className="mr-2" />}

                <span className="flex-1 text-sm text-gray-600">
                  {pl.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default memo(TicketBox);
