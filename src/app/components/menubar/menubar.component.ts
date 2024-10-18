import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdvertiseService } from '../../services/advertise.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../order.interface';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent implements OnInit {
  // old for droupdown-list
  ismenuOpen:boolean=false;
  toogleMenu():void{
    this.ismenuOpen=!this.ismenuOpen
  }
  // clickOutside():void{
  //   this.ismenuOpen=false;
  // }

  //new for enhancing understanding
  isLearly:boolean=false;
  trigler(){
    this.isLearly!=this.isLearly;
  }



  department :any={
    "departmentId": 0,
    "departmentName": "",
    "departmentLogo": ""
  };
  loggedUser:any;

  // object for the order
 orders:Order[]=[]

  constructor(
    private advise:AdvertiseService,
    private orderservice:OrderService
  ){}
  ngOnInit(): void {
    
  }

  async loadOrders(){
    try{
      this.orders=await this.orderservice.getOrders();
    }catch(error){
      console.error('Error Loading Orders',error)
    }
  }
  
  async deleteOrder(id:number |undefined){
    if (id === undefined) {
      console.error('Cannot delete order with undefined id');
      return;
    }
    try{
      await this.orderservice.deleteOrder(id);
      this.loadOrders();
    }
    catch(error){
      console.error('Error deleting order',error);
    }
  }
 
  //reloading outside
  subDepartment(){
    debugger;
    this.advise.addNewDepartment(this.department).subscribe(
      (res:any)=>{
        if(res.result){
          alert('ure department created successfully');
          console.log(res);
        }
        else{
          alert(res.massege);
        }
      }
    )
  }
  onlogoff(){}

 

}





//for the reloading in the proxy.conf.json
// "/api": {
//   "target": "https://projectapi.gerasim.in",
//   "secure": false,
//   "changeOrigin": true,
//   "logLevel": "debug"
// },