"use client";
import React from "react";
import LuggageService from "./_components/LuggageService";
import Inssurance from "./_components/InssuranceService";
import LuggagesDrawler from "./_components/LuggageService/LuggagesDrawler";
import MealDrawler from "./_components/MealService/MealDrawler";
import MealService from "./_components/MealService";
import SeatService from "./_components/SeatService";
import { bookingInformationVar } from "@/cache/vars";
import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import SeatDrawler from "./_components/SeatService/SeatDrawler/index.tsx";
import { FLIGHT_SERVICES } from "@/modules/bookingServices/bookingServices.interface";
enum DRAWLER {
  LUGGAGE = "luggage",
  MEAL = "meal",
  SEAT = "seat",
}
const FlightServicePage = () => {
  const bookingInformation = useReactiveVar(bookingInformationVar);

  const {
    services: selectedServices,
    flightDepart,
    flightReturn,
  } = bookingInformation;

  const [drawler, setOpenDrawler] = useState<DRAWLER | undefined>(undefined);
  return (
    <React.Fragment>
      <div className="service-page mx-auto container max-w-3xl">
        <div className="service-items py-6">
          <LuggageService
            onShowLuggageDrawler={() => setOpenDrawler(DRAWLER.LUGGAGE)}
            selectedService={selectedServices[FLIGHT_SERVICES.LUGGAGES]}
            flightDeparture={flightDepart}
            flightReturn={flightReturn}
          />
          <div className="py-4"></div>
          <SeatService
            onShowSeatDrawler={() => setOpenDrawler(DRAWLER.SEAT)}
            seatSelected={selectedServices[FLIGHT_SERVICES.SEATS]}
            flightDeparture={flightDepart}
            flightReturn={flightReturn}
          />
          <div className="py-4"></div>
          <MealService onShowMealDrawler={() => setOpenDrawler(DRAWLER.MEAL)} />
          <div className="py-4"></div>
          <Inssurance />
        </div>
      </div>
      <LuggagesDrawler
        isOpen={drawler === DRAWLER.LUGGAGE}
        onClose={() => setOpenDrawler(undefined)}
        selectedLuggages={selectedServices.luggages}
      />
      <MealDrawler
        isOpen={drawler === DRAWLER.MEAL}
        onClose={() => setOpenDrawler(undefined)}
      />
      <SeatDrawler
        isOpen={drawler === DRAWLER.SEAT}
        onClose={() => setOpenDrawler(undefined)}
        selectedSeats={selectedServices[FLIGHT_SERVICES.SEATS]}
      />
    </React.Fragment>
  );
};
export default FlightServicePage;
