export enum POLICES_CODES {
  CHANGE_ROUTE = "CHANGE_ROUTE",
  VOID_TICKET = "VOID_TICKET",
  AIRCRAFT_INFO = "AIRCRAFT_INFO",
  LUGGAGE_INFO = "LUGGAGE_INFO",
  OTHERS = "OTHERS",
  INCLUDED_ANCILLARY = "INCLUDED_ANCILLARY",
}
export interface IPolice {
  code: POLICES_CODES;
  description: string;
}

export class Police implements IPolice {
  code: POLICES_CODES;
  description: string;
  constructor(code: POLICES_CODES, description: string) {
    this.code = code;
    this.description = description;
  }
}
