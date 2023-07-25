import { Direction, IBookingType } from "@/Models/booking";
import { FlightDetailItemType } from "@/Models/ticket";
import { bookingInformationVar } from "@/cache/vars";
import { ReactiveVar } from "@apollo/client";

const useSelectFlight = (booingInformationVar: ReactiveVar<IBookingType>) => {
  const onSelectFlight = ({
    direction,
    ticket,
  }: {
    direction: Direction;
    ticket: { tid: string; outbound: FlightDetailItemType };
  }) => {
    let bookingInfor = bookingInformationVar();

    bookingInfor = {
      ...bookingInfor,
      flightItems: {
        ...bookingInfor.flightItems,
        [direction]: {
          tid: ticket.tid,
          outbound: ticket.outbound,
        },
      },
    };
    booingInformationVar(bookingInfor);
  };
  return {
    onSelectFlight,
  };
};
export default useSelectFlight;
