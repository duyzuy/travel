import LuggagesDrawler from "./addons/luggages/components/LuggagesDrawler";
import BookingInformationHeaderBar from "@/components/BookingInformationHeaderBar";
const LayoutFlightBooking = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flight-booking">
      <BookingInformationHeaderBar />
      {children}
      <LuggagesDrawler />
    </div>
  );
};

export default LayoutFlightBooking;
