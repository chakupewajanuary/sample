import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,FormsModule,HeaderComponent,SideNavComponent,MainComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {


  

  constructor(){}

  ngOnInit(): void {
    
  }


   

}
