import { BookingFormType, IAirPort } from "@/Models";
import { ReactiveVar } from "@apollo/client";
import { PaxType, TripDate, TripDestination, TripType } from "@/constants/enum";
export const useBookingFormFlight = (
  bookingFormFlightVar: ReactiveVar<BookingFormType>
) => {
  const changeTripType = (tripType: TripType) => {
    const bookingInfor = bookingFormFlightVar();
    const newBookingChange = {
      ...bookingInfor,
      tripType,
    };

    bookingFormFlightVar(newBookingChange);
  };

  const selectTripDestination = (
    destination: TripDestination,
    airport: IAirPort
  ) => {
    let bookingInformation = bookingFormFlightVar();

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
    bookingFormFlightVar(bookingInformation);
  };
  const onSwapDestination = () => {
    let bookingInformation = bookingFormFlightVar();

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

    bookingFormFlightVar(bookingInformation);
  };

  const onUpdateBookingTripDate = (
    action: "update" | "reset",
    data?: { tripDate: TripDate; date: Date | null; dateStr: string | null }
  ) => {
    let bookingInformation = bookingFormFlightVar();
    if (action === "update") {
      if (data && data.tripDate === TripDate.DATE_FROM) {
        bookingInformation = {
          ...bookingInformation,
          departDate: { value: data.dateStr, date: data.date },
        };
      }

      if (data && data.tripDate === TripDate.DATE_TO) {
        bookingInformation = {
          ...bookingInformation,
          returnDate: { value: data.dateStr, date: data.date },
        };
      }
      bookingFormFlightVar(bookingInformation);
    }
    if (action === "reset") {
      bookingFormFlightVar({
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
    let bookingInformation = bookingFormFlightVar();
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

    bookingFormFlightVar(
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
