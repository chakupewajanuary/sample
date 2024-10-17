import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { schedulePromise } from 'rxjs/internal/scheduled/schedulePromise';

@Component({
  selector: 'app-last-few-transactions',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './last-few-transactions.component.html',
  styleUrl: './last-few-transactions.component.scss'
})
export class LastFewTransactionsComponent implements OnInit{

  ngOnInit(): void {
    
  }

  Transaction=[
    {
    id:3,
    title:'Nike Shoes',
    Price:'$134',
    shop:'Vunja',
    Location:'Makomeni',
    Status:'skipped',
    imageScr:'https://dummyimage.com/400x300/00ff00/000'

  },
  {
    id:5,
    title:'Msabahah',
    Price:'$20',
    shop:'stationary',
    Location:'Kwamfipa',
    Status:'panding',
    image:'https://dummyimage.com/400x300/00ff00/000'

  },
  {
    id:10,
    title:'Shani',
    Price:'$1200',
    shop:'Fruits',
    Location:'Miembesaba',
    Status:'paid',
    // image:'https://dummyimage.com/400x300/00ff00/000'

  },
  {
    id:4,
    title:'Phones',
    Price:'$14',
    shop:'Chafu',
    Location:'Mikocheni',
    Status:'confirmed',
    image:'https://dummyimage.com/400x300/00ff00/000'

  }
]

}
