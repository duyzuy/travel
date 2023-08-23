export interface ITicketClass {
  cid: number;
  code: string;
  i_name: string;
  v_name: string;
}

export class TicketClass implements ITicketClass {
  cid: number;
  code: string;
  i_name: string;
  v_name: string;

  constructor(cid: number, code: string, i_name: string, v_name: string) {
    this.cid = cid;
    this.code = code;
    this.i_name = i_name;
    this.v_name = v_name;
  }
}
