import { IAirPort } from "@/Models/airport";
import {
  IBookingType,
  PaxType,
  TripDate,
  TripDestination,
  TripType,
} from "@/Models/booking";
import { ReactiveVar } from "@apollo/client";

export const useBookingInformation = (
  bookingInformationVar: ReactiveVar<IBookingType>
) => {
  const changeTripType = (tripType: TripType) => {
    const bookingInfor = bookingInformationVar();
    const newBookingChange = {
      ...bookingInfor,
      tripType,
    };

    bookingInformationVar(newBookingChange);
  };

  const selectTripDestination = (
    destination: TripDestination,
    airport: IAirPort
  ) => {
    let bookingInformation = bookingInformationVar();

    if (destination === TripDestination.TRIP_FROM) {
      bookingInformation = {
        ...bookingInformation,
        tripFrom: airport,
      };
    }
    if (destination === TripDestination.TRIP_TO) {
      bookingInformation = {
        ...bookingInformation,
        tripTo: airport,
      };
    }
    bookingInformationVar(bookingInformation);
  };
  const onSwapDestination = () => {
    let bookingInformation = bookingInformationVar();

    if (
      bookingInformation.tripFrom === null ||
      bookingInformation.tripTo === null
    )
      return;

    let temp = bookingInformation.tripFrom;

    bookingInformation = {
      ...bookingInformation,
      tripFrom: bookingInformation.tripTo,
      tripTo: temp,
    };

    bookingInformationVar(bookingInformation);
  };

  const onUpdateBookingTripDate = (
    action: "update" | "reset",
    data?: { tripDate: TripDate; date: Date | null }
  ) => {
    let bookingInformation = bookingInformationVar();
    if (action === "update") {
      if (data && data.tripDate === TripDate.DATE_FROM) {
        bookingInformation = {
          ...bookingInformation,
          departDate: { value: null, date: data.date },
        };
      }

      if (data && data.tripDate === TripDate.DATE_TO) {
        bookingInformation = {
          ...bookingInformation,
          returnDate: { value: null, date: data.date },
        };
      }
      bookingInformationVar(bookingInformation);
    }
    if (action === "reset") {
      bookingInformationVar({
        ...bookingInformation,
        returnDate: {
          value: null,
          date: null,
        },
        departDate: {
          value: null,
          date: null,
        },
      });
    }
  };

  const onUpdateAmountPassengers = (
    paxType: PaxType,
    { action, value }: { action: "minus" | "plus"; value: number }
  ) => {
    let bookingInformation = bookingInformationVar();
    const {
      passengers: { adult, children },
    } = bookingInformation;

    let paxTypeAmout = bookingInformation.passengers[paxType].amount;

    const MAXIMUM_PAX_AMOUNT = 9;

    switch (paxType) {
      case PaxType.ADULT: {
        if (
          action === "plus" &&
          paxTypeAmout + children.amount < MAXIMUM_PAX_AMOUNT
        ) {
          paxTypeAmout = paxTypeAmout + 1;
        }
        if (action === "minus" && paxTypeAmout > 1) {
          paxTypeAmout = paxTypeAmout - 1;
        }
        break;
      }
      case PaxType.CHILDREN: {
        if (action === "plus" && paxTypeAmout + adult.amount < 9) {
          paxTypeAmout = paxTypeAmout + 1;
        }

        if (action === "minus" && paxTypeAmout > 0) {
          paxTypeAmout = paxTypeAmout - 1;
        }
        break;
      }
      case PaxType.INFANT: {
        if (action === "plus" && paxTypeAmout < adult.amount) {
          paxTypeAmout = paxTypeAmout + 1;
        }

        if (action === "minus" && paxTypeAmout > 0) {
          paxTypeAmout = paxTypeAmout - 1;
        }
        break;
      }
    }

    bookingInformationVar(
      (bookingInformation = {
        ...bookingInformation,
        passengers: {
          ...bookingInformation.passengers,
          [paxType]: {
            ...bookingInformation.passengers[paxType],
            amount: paxTypeAmout,
          },
        },
      })
    );
  };
  return {
    operations: {
      changeTripType,
      selectTripDestination,
      onSwapDestination,
      onUpdateBookingTripDate,
      onUpdateAmountPassengers,
    },
  };
};
