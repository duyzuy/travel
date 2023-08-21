import LuggagesDrawler from "./addons/luggages/components/LuggagesDrawler";
import FlightBookingHeaderBar from "./_components/FlightBookingHeaderBar";
const LayoutFlightBooking = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flight-booking">
      <FlightBookingHeaderBar />
      {children}
      <LuggagesDrawler />
    </div>
  );
};

export default LayoutFlightBooking;
