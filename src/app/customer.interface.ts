export interface Customer {
  CustId: number;
  Name: string;
  MobileNo: string;
  Password: string;
}

// for admin uses
export interface CustomerReg {
  CustId: number;
  Name: string;
}