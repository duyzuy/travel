export type SelectionValidity = {
  available: boolean;
  reserved: boolean;
  reservedWithInfant: boolean;
  saleBlock: boolean;
  serviceBlock: boolean;
  invalidAllLegs: boolean;
};

export type SeatOptionType = {
  selectionKey: string;
  selectionValidity: SelectionValidity;
  seatMapCell: {
    key: string;
    rowIdentifier: string;
    seatIdentifier: string;
    seatQualifiers: {
      aisle: boolean;
      window: boolean;
      emergencyExit: boolean;
      bulkheadFront: true;
      bulkheadBack: boolean;
      overWing: boolean;
      nearEngine: boolean;
      limitedRecline: boolean;
      disabled: boolean;
      lastAssigned: boolean;
      infant: boolean;
      stretcher: boolean;
    };
  };
  blockInformation: null | string;
  seatCharges: {
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
      taxRateAmounts: [
        {
          name: string;
          amount: number;
        },
      ];
      totalAmount: number;
      currency: {
        href: string;
        code: string;
        description: string;
      };
      taxConfiguration: {
        feeCategory: null;
      };
    }[];
  }[];
};

export interface ISeatMapModel {
  href: string;
  key: string;
  flightSegment: {
    flight: {
      href: string;
      key: string;
      airlineCode: {
        href: string;
        code: string;
      };
      flightNumber: string;
      operatingPartnerCarrier: null | string;
      operatingPartnerFlightNumber: string;
    };
    flightLegs: [
      {
        href: string;
        key: string;
        legNumber: number;
        departure: {
          scheduledTime: string;
          localScheduledTime: string;
          airport: {
            href: string;
            code: string;
            name: string;
            utcOffset: {
              iso: string;
              hours: number;
              minutes: number;
            };
          };
        };
        arrival: {
          scheduledTime: string;
          localScheduledTime: string;
          airport: {
            href: string;
            code: string;
            name: string;
            utcOffset: {
              iso: string;
              hours: number;
              minutes: number;
            };
          };
        };
      },
    ];
  };
  seatMap: {
    key: string;
    name: string;
    aircraftModel: {
      href: string;
      key: string;
      identifier: string;
      name: string;
    };
    openSeating: false;
  };
  seatOptions: SeatOptionType[];
}
