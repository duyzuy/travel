export interface IAncillaryCharge {
  description: string;
  chargeType: {
    href: string;
    code: string;
    description: string;
    feeCategory: null;
    index: number;
  };
  currencyAmounts: {
    baseAmount: number;
    discountAmount: number;
    taxAmount: number;
    taxRateAmounts: {
      name: string;
      amount: number;
    }[];
    totalAmount: number;
    currency: {
      href: string;
      code: string;
      description: string;
    };
  }[];
  taxConfiguration: {
    feeCategory: null | string;
  };
}
