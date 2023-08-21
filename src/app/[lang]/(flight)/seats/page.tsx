"use client";

import { useApolloClient } from "@apollo/client";
import { SEAT_MAP_A320, SEAT_MAP_A321, SEAT_MAP_A330 } from "./datavj";
import { WRITE_SEAT_MAP } from "@/cache/wtire";
import FlightSectors from "@/components/Flights/FlightSectors";
import Button from "@/components/base/Button";
import SeatMapBooking from "./components/SeatMapBooking";
import SeatBookingNavigation from "./components/SeatBookingNavigation";
const SeatSelectionPage = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) => {
  const client = useApolloClient();
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
          <SeatMapBooking />
          <SeatBookingNavigation />
        </div>
      </div>
    </div>
  );
};
export default SeatSelectionPage;
