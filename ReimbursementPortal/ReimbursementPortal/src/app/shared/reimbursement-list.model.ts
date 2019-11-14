export class ReimbursementList {
  Id: number;
  Date: Date;
  ReimbursementType: string;
  RequestedValue: number;
  ApprovedValue: number;
  Currency: string;
  RequestedPhase: string;
  ReceiptAttached: string;
  // tslint:disable-next-line: variable-name
  userName: string;
}
