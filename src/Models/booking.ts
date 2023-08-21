// import { TripType, PaxType } from "@/constants/enum";
// import { IAirPort } from "./airport";
// import { FlightDetailItemType } from "./ticket";
// export interface ISearFlightDate {
//   value: string | null;
//   date: Date | null;
// }

// export interface IBookingType {
//   bookingInfor: {
//     tripType: TripType;
//     returnDate: ISearFlightDate;
//     departDate: ISearFlightDate;
//     tripFrom: IAirPort | null;
//     tripTo: IAirPort | null;
//     passengers: {
//       [PaxType.ADULT]: {
//         amount: number;
//         paxType: PaxType.ADULT;
//       };
//       [PaxType.CHILDREN]: {
//         amount: number;
//         paxType: PaxType.CHILDREN;
//       };
//       [PaxType.INFANT]: {
//         amount: number;
//         paxType: PaxType.INFANT;
//       };
//     };
//   };
//   flightItems: {
//     outbound: { tid: string; outbound: FlightDetailItemType } | null;
//     inbound: { tid: string; outbound: FlightDetailItemType } | null;
//   };
//   passengersInfo: {};
// }

// export const bookingInitialState: IBookingType = {
//   bookingInfor: {
//     tripType: TripType.ROUND_TRIP,
//     returnDate: {
//       value: null,
//       date: null,
//     },
//     departDate: {
//       value: null,
//       date: null,
//     },
//     tripFrom: null,
//     tripTo: null,
//     passengers: {
//       [PaxType.ADULT]: {
//         amount: 1,
//         paxType: PaxType.ADULT,
//       },
//       [PaxType.CHILDREN]: {
//         amount: 0,
//         paxType: PaxType.CHILDREN,
//       },
//       [PaxType.INFANT]: {
//         amount: 0,
//         paxType: PaxType.INFANT,
//       },
//     },
//   },
//   flightItems: {
//     outbound: null,
//     inbound: null,
//   },
//   passengersInfo: {},
// };
// export type BookingFormType = typeof bookingInitialState.bookingInfor;
// export const bookingFormInitialState: BookingFormType = {
//   tripType: TripType.ROUND_TRIP,
//   returnDate: {
//     value: null,
//     date: null,
//   },
//   departDate: {
//     value: null,
//     date: null,
//   },
//   tripFrom: null,
//   tripTo: null,
//   passengers: {
//     [PaxType.ADULT]: {
//       amount: 1,
//       paxType: PaxType.ADULT,
//     },
//     [PaxType.CHILDREN]: {
//       amount: 0,
//       paxType: PaxType.CHILDREN,
//     },
//     [PaxType.INFANT]: {
//       amount: 0,
//       paxType: PaxType.INFANT,
//     },
//   },
// };

// export type PassengersType = typeof bookingInitialState.bookingInfor.passengers;
