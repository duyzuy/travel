import FlightBookingHeaderBar from "./_components/FlightBookingHeaderBar";
const LayoutFlightBooking = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flight-booking">
      <FlightBookingHeaderBar />
      <div className="booking-flight" style={{ background: "#F4F8FA" }}>
        {children}
      </div>
    </div>
  );
};

export default LayoutFlightBooking;
