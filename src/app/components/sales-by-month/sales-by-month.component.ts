import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, LineController, registerables } from 'chart.js';
import { provideCharts } from 'ng2-charts';
import { config } from 'rxjs';


Chart.register(...registerables);


@Component({
  selector: 'app-sales-by-month',
  standalone: true,
  imports: [CommonModule,],
  providers:[provideCharts()],
  templateUrl: './sales-by-month.component.html',
  styleUrl: './sales-by-month.component.scss'
})
export class SalesByMonthComponent implements AfterViewInit {
// chart:Chart|undefined;
// @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
@ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

 constructor(){}

 ngAfterViewInit(): void {
   this.createChart();
 }
 

 createChart() {
  const ctx = this.chartCanvas.nativeElement.getContext('2d');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jully'],
        datasets: [{
          label: 'Sales by Month',
          data: [12, 19, 3, 5, 2, 3,20],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Product B Sales',
          data: [5, 15, 10, 8, 12, 9,20],
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        },]
      },
      options: {
        responsive: true,
        plugins:{
          legend:{
            position:'top',
          },

          title:{
          display:true,
          text:'Monthly sales by comparisons'
          }
        },
        scales:{
          y:{
            beginAtZero:true,
            title:{
              display:true,
              text:'sales'
            }
          },
          x:{
            beginAtZero:true,
            title:{
              display:true,
              text:'Month'
            }
          }
        }
      
        


        // scales: {
        //   y: {
        //     beginAtZero: true
        //   }
        // }
      }
    });

    // new Chart(ctx, config);

  }

}


}
