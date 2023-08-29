export interface IAncillaryItem {
  key: string;
  name: string;
  description: string;
  index: number;
  ancillaryCategory: {
    key: string;
    name: string;
    description: string;
    index: number;
    purchaseConditions: {
      allowMultipleItems: boolean;
    };
  };
  ancillaryOptionType: {
    airportOption: boolean;
    cityPairOption: boolean;
    flightOption: boolean;
    reservationOption: boolean;
  };
  purchaseConditions: {
    maximumPerPassengerCount: number;
  };
}
