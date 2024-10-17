import { AfterViewInit, Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-sales-by-category',
  standalone: true,
  imports: [],
  templateUrl: './sales-by-category.component.html',
  styleUrl: './sales-by-category.component.scss'
})
export class SalesByCategoryComponent implements AfterViewInit{
  @ViewChild('chartCanvas') chartCanvas!:ElementRef<HTMLCanvasElement>;
  // @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;



  constructor(){}

  ngAfterViewInit(): void {
    this.createChart();
    
  }
  createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      const config: ChartConfiguration<'pie', number[], string> = {
        type: 'pie',
        data: {
          labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Toys'],
          datasets: [{
            data: [30, 25, 15, 20, 10],
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Sales by Category'
            }
          }
        }
      };

      new Chart(ctx, config);
    }
  }
}
