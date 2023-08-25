"use client";

import PassengerInformation from "./_components/PassengerInformation";

import Button from "@/components/base/Button";

import OrderSummary from "@/components/OrderSummary";
import Luggages from "../addons/luggages";
import Inssurance from "../addons/Inssurance";
import { useBookingFlightInfo } from "@/modules/bookingTicket/useBookingFlightInfo";
import { bookingInformationVar } from "@/cache/vars";
import { useEffect, useMemo } from "react";
import ContactInformation from "./_components/ContactInformation";
import usePassengerInformation from "@/modules/passengerInformation/usePassengerInformation";
import { passengerInformationVar } from "@/modules/passengerInformation/passengerInformation.var";
const PassengerPage = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) => {
  const { flightBookingInfo } = useBookingFlightInfo(bookingInformationVar);

  const bookingInformation = useMemo(() => {
    return flightBookingInfo.bookingInfo;
  }, [flightBookingInfo]);

  const {
    onAddContactInformation,
    onAddPassengersInformation,
    onInitPassengers,
    passengerInformation,
  } = usePassengerInformation(passengerInformationVar);
  console.log({ flightBookingInfo, passengerInformation });

  const handleNext = () => {
    console.log(bookingInformation);
  };
  useEffect(() => {
    onInitPassengers();
  }, []);
  return (
    <div className="container flex items-start mx-auto py-12">
      <div className="passenger-wrapper w-4/6 mr-6">
        {bookingInformation.passengers && (
          <PassengerInformation
            person={bookingInformation.passengers}
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
        {/* <div className="add-on-services py-6">
          <Luggages />
          <div className="space py-3"></div>
          <Inssurance />
        </div> */}
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
