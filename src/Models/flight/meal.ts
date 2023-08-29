import { IAncillaryCharge } from "./ancillaryCharges";
import { IAncillaryItem } from "./ancillaryItem";
export interface IMealOption {
  href: string;
  key: string;
  purchaseKey: string;
  ancillaryItem: IAncillaryItem & { image: string; description: string };
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
    available: true;
    package: false;
    unavailable: false;
  };
  ancillaryCharges: IAncillaryCharge[];
}
