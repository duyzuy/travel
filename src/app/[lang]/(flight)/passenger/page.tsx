"use client";

import Button from "@/components/base/Button";

import OrderSummary from "@/components/OrderSummary";

import { useBookingFlightInfo } from "@/modules/bookingTicket/useBookingFlightInfo";
import { bookingInformationVar } from "@/cache/vars";
import { useEffect, useMemo } from "react";
import ContactInformation from "./_components/ContactInformation";
import PassengerInformation from "./_components/PassengerInformation";
import usePassengerInformation from "@/modules/passengerInformation/usePassengerInformation";
import { passengerInformationVar } from "@/modules/passengerInformation/passengerInformation.var";
import { useRouter } from "next/navigation";
const PassengerPage = ({ params }: { params: { lang: string } }) => {
  const { flightBookingInfo } = useBookingFlightInfo(bookingInformationVar);

  const router = useRouter();
  const bookingInformation = useMemo(() => {
    return flightBookingInfo.bookingInfo;
  }, [flightBookingInfo]);

  const passengerBooking = useMemo(() => {
    return flightBookingInfo.passengerInformation;
  }, [flightBookingInfo]);

  const {
    onAddContactInformation,
    onAddPassengersInformation,
    onInitPassengers,
    onFinish,
    passengerInformation,
  } = usePassengerInformation(passengerInformationVar);

  const handleNext = () => {
    onFinish();
    router.push("./services");
  };
  useEffect(() => {
    onInitPassengers();
  }, []);
  return (
    <div className="container flex items-start mx-auto py-12">
      <div className="passenger-wrapper w-4/6 mr-6">
        {passengerBooking.passengers && (
          <PassengerInformation
            // person={bookingInformation.passengers}
            onAddPassengers={onAddPassengersInformation}
            passengers={passengerInformation.passengers}
          />
        )}
        <ContactInformation
          onAddContact={onAddContactInformation}
          contactInformation={{
            contactEmail: passengerInformation.contactEmail,
            contactFirstName: passengerInformation.contactFirstName,
            title: passengerInformation.title,
            contactLastName: passengerInformation.contactLastName,
            contactGender: passengerInformation.contactGender,
            contactPhone: passengerInformation.contactPhone,
          }}
        />
        <div className="bottom-box py-6 text-right">
          <Button
            color="secondary"
            className="w-36"
            rounded="sm"
            onClick={handleNext}
          >
            Tiếp tục
          </Button>
        </div>
      </div>
      <OrderSummary />
    </div>
  );
};
export default PassengerPage;
