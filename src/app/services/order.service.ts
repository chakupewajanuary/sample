import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndexeddbService } from '../indexeddb.service';
import { Order } from '../order.interface';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  //object for the url(api =>endpoint)
  apiUrl='https://freeapi.gerasim.in/api/amazon/PlaceOrder';
  // apiUrl='/api/amazon/PlaceOrder'

  constructor(
    private http :HttpClient,
    private indexedDbService: IndexeddbService
  ) { }




  async placeOrder(orderData: Order): Promise<any> {
    await this.indexedDbService.waitForDb();
    const addedOrder = await this.indexedDbService.add({ ...orderData, status: 'pending' });
    this.syncWithServer().subscribe();
    return addedOrder;
  }

  private syncWithServer(): Observable<any> {
    return from(this.getPendingOrders()).pipe(
      switchMap(orders => {
        const syncPromises = orders.map(order => this.sendOrderToServer(order));
        return from(Promise.all(syncPromises));
      })
    );
  }
  // placeOrder(orderData:Order):Observable<any>{
  //   return from(this.indexedDbService.add({...orderData, status: 'pending'})).pipe(
  //     switchMap(()=>this.syn)
  //   )
  // }
  // placeOrder(orderData: Order): Observable<any> {
  //   return from(this.indexedDbService.add({ ...orderData, status: 'pending' })).pipe(
  //     switchMap(() => this.syncWithServer())
  //   );
  // }

  // private syncWithServer(): Observable<any> {
  //   return from(this.getPendingOrders()).pipe(
  //     switchMap(orders => {
  //       const syncPromises = orders.map(order => this.sendOrderToServer(order));
  //       return from(Promise.all(syncPromises));
  //     })
  //   );
  // }

  private getPendingOrders(): Promise<Order[]> {
    return this.indexedDbService.getAll().then(orders => 
      orders.filter(order => order.status === 'pending')
    );
  }

  private sendOrderToServer(order: Order): Promise<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json-patch+json',
      'accept': 'text/plain'
    });
    return this.http.post(this.apiUrl, order, { headers }).toPromise()
    .then(() => this.updateOrderStatus(order.id!, 'synced'))
    .catch(() => this.updateOrderStatus(order.id!, 'failed'));
}

private updateOrderStatus(id: number, status: 'synced' | 'failed'): Promise<void> {
  return this.indexedDbService.getAll()
    .then(orders => {
      const order = orders.find(o => o.id === id);
      if (order) {
        order.status = status;
        return this.indexedDbService.update(order);
      }
      throw new Error('Order not found');
    });
}

getOrders(): Promise<Order[]> {
  return this.indexedDbService.getAll();
}

updateOrder(order: Order): Promise<void> {
  return this.indexedDbService.update(order);
}

deleteOrder(id: number): Promise<void> {
  return this.indexedDbService.delete(id);
}
}
