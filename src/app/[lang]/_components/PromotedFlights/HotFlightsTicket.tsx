"use client";
import React, {
  memo,
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import classNames from "classnames";
import { useClickOutSide } from "@/hooks/useClickOutSide";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Grid, Scrollbar, Navigation, Virtual } from "swiper/modules";
import FlightTicket from "./FlightTicket";
import { Airline } from "@/Models/flight/airline";
import { AirportItemType, FlightTicketType } from "@/Models/hotFlight";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import styles from "./flight-ticket.module.scss";
const HotFlightsTicket: React.FC<{
  airlines: Airline[];
  airports: AirportItemType[];
  hotTickets: FlightTicketType[];
}> = ({ airlines, airports, hotTickets }) => {
  const [airportSelection, setAirportSelection] = useState<{
    current: AirportItemType;
    isShowing: boolean;
  }>({
    current: {
      code: "SGN",
      airportName: "Sân bay Tân Sơn Nhất",
      cityName: "Tp Hồ Chí Minh",
    },
    isShowing: false,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType>();
  const [isMounted, setMounted] = useState(false);
  useClickOutSide(dropdownRef, () => {
    setAirportSelection((prev) => ({
      ...prev,
      isShowing: false,
    }));
  });

  const onShowDropdown = () => {
    setAirportSelection((prev) => ({
      ...prev,
      isShowing: true,
    }));
  };
  const onSelectAirport = (airport: AirportItemType) => {
    setAirportSelection((prev) => ({
      isShowing: false,
      current: {
        ...airport,
      },
    }));
  };

  const flightsListByAirports = useMemo(() => {
    const output = hotTickets.filter(
      (item) => item.itinerary.fromAirport === airportSelection.current.code
    );

    return output;
  }, [airportSelection.current, hotTickets]);

  const getAirportName = useCallback(
    (code: string) => {
      const item = airports.find((item) => item.code === code);
      (item && item.cityName) || "";

      return (item && item.cityName) || "";
    },
    [airports]
  );
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="container mx-auto">
      <div className="section-head py-3 mb-3">
        <div className="selection-title block md:flex md:items-center text-center">
          <h3 className="text-xl md:text-3xl text-center">
            Chuyến bay giá tốt khởi hành từ
          </h3>

          <div className="hotflight-selection relative inline-block">
            <div
              className="selection-showing inline-flex items-center px-2 py-3 text-emerald-500 cursor-pointer"
              onClick={onShowDropdown}
            >
              <span className="text-emerald-500 text-xl md:text-3xl block">
                {airportSelection.current.cityName}
              </span>
              <span className="icon ml-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>
            {(airportSelection.isShowing && (
              <div
                className="selection-dropdown absolute w-56 shadow-lg bg-white z-10 text-left"
                ref={dropdownRef}
              >
                {airports.map((airport, index) => (
                  <div
                    className={classNames({
                      "option px-4 py-3 hover:bg-gray-200 cursor-pointer": true,
                      active: airportSelection.current.code === airport.code,
                    })}
                    key={`${airport.code}-${index}`}
                    onClick={() => onSelectAirport(airport)}
                  >
                    <p
                      className={classNames({
                        current: airportSelection.current.code === airport.code,
                      })}
                    >
                      {airport.cityName}
                    </p>
                  </div>
                ))}
              </div>
            )) || <></>}
          </div>
        </div>
        <p className="md:text-left text-center">
          Giá tốt nhất từ VietnamAirlines, Bamboo, Vietjet
        </p>
      </div>
      <div className="section-body">
        {(isMounted && (
          <div className="flights-ticker-slider relative">
            <div className="swiper-navigation flex items-center justify-end mb-2">
              <span
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span
                onClick={() => swiperRef.current?.slideNext()}
                className="w-8 h-8 ml-3 flex items-center justify-center bg-slate-100 rounded-full cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <Swiper
              slidesPerView={2}
              freeMode={true}
              spaceBetween={20}
              scrollbar={{
                hide: false,
                draggable: true,
              }}
              grid={{
                rows: 2,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Grid, Scrollbar, Navigation]}
              className={styles.swiper}
            >
              {flightsListByAirports.map((ticket) => (
                <React.Fragment
                  key={`ticket-${ticket.itinerary.fromAirport}-${ticket.itinerary.toAirport}`}
                >
                  {ticket.priceOptions.map((priceOption, index) => (
                    <SwiperSlide
                      className="sw-slide"
                      key={`${ticket.itinerary.fromAirport}-${ticket.itinerary.toAirport}-${index}`}
                    >
                      <FlightTicket
                        data={priceOption}
                        tripFrom={getAirportName(ticket.itinerary.fromAirport)}
                        tripTo={getAirportName(ticket.itinerary.toAirport)}
                      />
                    </SwiperSlide>
                  ))}
                </React.Fragment>
              ))}
            </Swiper>
          </div>
        )) || <>not</>}
      </div>
    </div>
  );
};
export default memo(HotFlightsTicket);
