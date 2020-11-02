import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-resultado-admin',
  templateUrl: './resultado-admin.page.html',
  styleUrls: ['./resultado-admin.page.scss'],
})
export class ResultadoAdminPage implements OnInit {
  chart: any;
  constructor(private _emp: DataService) { }

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['Aciertos', 'Desaciertos'],
        datasets: [
          {
            data: [71, 3],
            backgroundColor: ['rgba(45, 211, 111, 1)', 'rgba(235, 68, 90, 0.5)'],
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: true
        },
        tooltips:{
          enabled:false
        }
      }
    });
  }

}
