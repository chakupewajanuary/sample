import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ElementRef, ViewChild, } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-top-three-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-three-products.component.html',
  styleUrl: './top-three-products.component.scss'
})
export class TopThreeProductsComponent implements AfterViewInit {

@ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;


ngAfterViewInit(): void {
  this.createChart()
  
}

createChart() {
  const ctx = this.chartCanvas.nativeElement.getContext('2d');
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jully'],
        datasets: [{
          label: 'Sales by Month',
          data: [12, 19, 3, 5, 2, 3,20],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
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
