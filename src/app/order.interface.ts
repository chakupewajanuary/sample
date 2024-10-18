export interface Order{
    id?: number;
    SaleId: number;
    CustId: number;
    SaleDate: string;
    TotalInvoiceAmount: number;
    Discount: number;
    PaymentNaration: string;
    DeliveryAddress1: string;
    DeliveryAddress2: string;
    DeliveryCity: string;
    DeliveryPinCode: string;
    DeliveryLandMark: string;
    status: 'pending' | 'synced' | 'failed';
}