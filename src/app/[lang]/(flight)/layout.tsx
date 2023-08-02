import LuggagesDrawler from "./addons/luggages/components/LuggagesDrawler";

const LayoutFlightBooking = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flight-booking">
      {children}
      <LuggagesDrawler />
    </div>
  );
};

export default LayoutFlightBooking;
