import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { Order } from '../../order.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-buy',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './order-buy.component.html',
  styleUrls: ['./order-buy.component.scss']
})
export class OrderBuyComponent  {


  //intialization of the order
  order:Order={
    SaleId: 0,
    CustId: 0,
    SaleDate: new Date().toISOString(),
    TotalInvoiceAmount: 0,
    Discount: 0,
    PaymentNaration: '',
    DeliveryAddress1: '',
    DeliveryAddress2: '',
    DeliveryCity: '',
    DeliveryPinCode: '',
    DeliveryLandMark: '',
    status: 'pending'
  };

  constructor(
    private orderservice:OrderService,
    private router:Router
  ) {}

  // onSubmit(){
  //   this.orderservice.placeOrder(this.order).subscribe(
  //     ()=>{
  //       console.log('Order placed successfully');
  //       this.router.navigate(['/navbar']);
  //     },
  //     error => console.error('Error placing order', error)
  //   );
  // }
  async onSubmit() {
    debugger;
    try {
      await this.orderservice.placeOrder(this.order);
      console.log('Order placed successfully');
      this.router.navigate(['/navbar']);
    } catch (error) {
      console.error('Error placing order', error);
    }
  }
 
}
