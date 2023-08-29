import { IAncillaryCharge } from "./ancillaryCharges";
import { IAncillaryItem } from "./ancillaryItem";
export interface ILuggage {
  href: string;
  key: string;
  purchaseKey: string;
  ancillaryItem: IAncillaryItem;
  requirementLocation: {
    date: string;
    airport: null;
    cityPair: {
      href: string;
      identifier: string;
    };
    flight: null | string;
  };
  availability: null | string;
  purchaseApplicability: {
    available: boolean;
    package: boolean;
    unavailable: boolean;
  };
  ancillaryCharges: IAncillaryCharge[];
  languages: {};
}
