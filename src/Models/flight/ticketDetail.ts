import { Police } from "./police";
export interface ITicketDetail {
  cid: number;
  providerId: number;
  policy: string | null;
  freeHandBaggage: number;
  freeCheckedBaggage: string | null;
  planeCode: string | null;
  farePrice: number;
  farePriceAdult: number;
  farePriceChild: number;
  priceAdults: number;
  priceChildren: number;
  priceInfants: number;
  priceAdultsWithoutBookerMarkup: number;
  priceChildrenWithoutBookerMarkup: number;
  priceInfantsWithoutBookerMarkup: number;
  priceAdultUnit: number;
  priceChildUnit: number;
  priceInfantUnit: number;
  discountAdultUnit: number;
  discountChildUnit: number;
  discountInfantUnit: number;
  discountAdult: number;
  discountChild: number;
  discountInfant: number;
  priceAdultUnitWithoutBookerMarkup: number;
  priceChildUnitWithoutBookerMarkup: number;
  priceInfantUnitWithoutBookerMarkup: number;
  ticketClassCode: string;
  mileAccrualRate: number;
  totalTicketingCharge: number;
  grandTotal: number;
  grandTotalWithoutBookerMarkup: number;
  numStops: number;
  flightChildren: string | null;
  link: string | null;
  holdingTime: number;
  holdingTimeExactly: true;
  additionalInfo: null;
  detailTicketClass: string;
  bonusPoint: number;
  needPassport: boolean;
  additionalPoliciesFetchingSupport: boolean;
  supportsFrequentFlyerNumberInput: boolean;
  buySignals: [];
  polices: Police[];
  facilities: Police[];
  bestGroupPriceAdultUnit: number;
  discount: number;
}

export class TicketDetail implements ITicketDetail {
  cid: number;
  providerId: number;
  policy: string | null;
  freeHandBaggage: number;
  freeCheckedBaggage: string | null;
  planeCode: string | null;
  farePrice: number;
  farePriceAdult: number;
  farePriceChild: number;
  priceAdults: number;
  priceChildren: number;
  priceInfants: number;
  priceAdultsWithoutBookerMarkup: number;
  priceChildrenWithoutBookerMarkup: number;
  priceInfantsWithoutBookerMarkup: number;
  priceAdultUnit: number;
  priceChildUnit: number;
  priceInfantUnit: number;
  discountAdultUnit: number;
  discountChildUnit: number;
  discountInfantUnit: number;
  discountAdult: number;
  discountChild: number;
  discountInfant: number;
  priceAdultUnitWithoutBookerMarkup: number;
  priceChildUnitWithoutBookerMarkup: number;
  priceInfantUnitWithoutBookerMarkup: number;
  ticketClassCode: string;
  mileAccrualRate: number;
  totalTicketingCharge: number;
  grandTotal: number;
  grandTotalWithoutBookerMarkup: number;
  numStops: number;
  flightChildren: string | null;
  link: string | null;
  holdingTime: number;
  holdingTimeExactly: true;
  additionalInfo: null;
  detailTicketClass: string;
  bonusPoint: number;
  needPassport: boolean;
  additionalPoliciesFetchingSupport: boolean;
  supportsFrequentFlyerNumberInput: boolean;
  buySignals: [];
  polices: Police[];
  facilities: Police[];
  bestGroupPriceAdultUnit: number;
  discount: number;

  constructor(
    cid: number,
    providerId: number,
    policy: string | null,
    freeHandBaggage: number,
    freeCheckedBaggage: string | null,
    planeCode: string | null,
    farePrice: number,
    farePriceAdult: number,
    farePriceChild: number,
    priceAdults: number,
    priceChildren: number,
    priceInfants: number,
    priceAdultsWithoutBookerMarkup: number,
    priceChildrenWithoutBookerMarkup: number,
    priceInfantsWithoutBookerMarkup: number,
    priceAdultUnit: number,
    priceChildUnit: number,
    priceInfantUnit: number,
    discountAdultUnit: number,
    discountChildUnit: number,
    discountInfantUnit: number,
    discountAdult: number,
    discountChild: number,
    discountInfant: number,
    priceAdultUnitWithoutBookerMarkup: number,
    priceChildUnitWithoutBookerMarkup: number,
    priceInfantUnitWithoutBookerMarkup: number,
    ticketClassCode: string,
    mileAccrualRate: number,
    totalTicketingCharge: number,
    grandTotal: number,
    grandTotalWithoutBookerMarkup: number,
    numStops: number,
    flightChildren: string | null,
    link: string | null,
    holdingTime: number,
    holdingTimeExactly: true,
    additionalInfo: null,
    detailTicketClass: string,
    bonusPoint: number,
    needPassport: boolean,
    additionalPoliciesFetchingSupport: boolean,
    supportsFrequentFlyerNumberInput: boolean,
    buySignals: [],
    polices: Police[],
    facilities: Police[],
    bestGroupPriceAdultUnit: number,
    discount: number
  ) {
    this.cid = cid;
    this.providerId = providerId;
    this.policy = policy;
    this.freeHandBaggage = freeHandBaggage;
    this.freeCheckedBaggage = freeCheckedBaggage;
    this.planeCode = planeCode;
    this.farePrice = farePrice;
    this.farePriceAdult = farePriceAdult;
    this.farePriceChild = farePriceChild;
    this.priceAdults = priceAdults;
    this.priceChildren = priceChildren;
    this.priceInfants = priceInfants;
    this.priceAdultsWithoutBookerMarkup = priceAdultsWithoutBookerMarkup;
    this.priceChildrenWithoutBookerMarkup = priceChildrenWithoutBookerMarkup;
    this.priceInfantsWithoutBookerMarkup = priceInfantsWithoutBookerMarkup;
    this.priceAdultUnit = priceAdultUnit;
    this.priceChildUnit = priceChildUnit;
    this.priceInfantUnit = priceInfantUnit;
    this.discountAdultUnit = discountAdultUnit;
    this.discountChildUnit = discountChildUnit;
    this.discountInfantUnit = discountInfantUnit;
    this.discountAdult = discountAdult;
    this.discountChild = discountChild;
    this.discountInfant = discountInfant;
    this.priceAdultUnitWithoutBookerMarkup = priceAdultUnitWithoutBookerMarkup;
    this.priceChildUnitWithoutBookerMarkup = priceChildUnitWithoutBookerMarkup;
    this.priceInfantUnitWithoutBookerMarkup =
      priceInfantUnitWithoutBookerMarkup;
    this.ticketClassCode = ticketClassCode;
    this.mileAccrualRate = mileAccrualRate;
    this.totalTicketingCharge = totalTicketingCharge;
    this.grandTotal = grandTotal;
    this.grandTotalWithoutBookerMarkup = grandTotalWithoutBookerMarkup;
    this.numStops = numStops;
    this.flightChildren = flightChildren;
    this.link = link;
    this.holdingTime = holdingTime;
    this.holdingTimeExactly = holdingTimeExactly;
    this.additionalInfo = additionalInfo;
    this.detailTicketClass = detailTicketClass;
    this.bonusPoint = bonusPoint;
    this.needPassport = needPassport;
    this.additionalPoliciesFetchingSupport = additionalPoliciesFetchingSupport;
    this.supportsFrequentFlyerNumberInput = supportsFrequentFlyerNumberInput;
    this.buySignals = buySignals;
    this.polices = polices;
    this.facilities = facilities;
    this.bestGroupPriceAdultUnit = bestGroupPriceAdultUnit;
    this.discount = discount;
  }
}
