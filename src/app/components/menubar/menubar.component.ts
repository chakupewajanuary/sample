import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdvertiseService } from '../../services/advertise.service';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent {
  ismenuOpen:boolean=false;
  toogleMenu():void{
    this.ismenuOpen=!this.ismenuOpen
  }
  clickOutside():void{
    this.ismenuOpen=false;
  }
  department :any={
    "departmentId": 0,
    "departmentName": "",
    "departmentLogo": ""
  };
  loggedUser:any;


  constructor(private advise:AdvertiseService){}
 
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