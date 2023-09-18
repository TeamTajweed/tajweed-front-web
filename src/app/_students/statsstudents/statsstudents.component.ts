import { Component } from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-statsstudents',
  templateUrl: './statsstudents.component.html',
  styleUrls: ['./statsstudents.component.scss']
})
export class StatsstudentsComponent {
  options: any;
  hideLegend(){
    //this.options.legend.show = false;
  }
  addStudents(){
    //TO DO MM Ouverture Modale gestion d'ajout 
  }
  ngOnInit() {
    this.options = {
      chart: {
        height: "100%",
        maxWidth: "100%",
        type: "line",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -26
        },
      },
      //Les dessin des courbes se fait ici
      series: [
        {
          name: "Adam",
          data: [24, 25, 26, 27, 28, 32],
          color: "#F0A52A",
        },
        {
          name: "Yassine",
          data: [125, 125, 127, 130, 135, 140],
          color: "#7E3AF2",
        },
        {
          name: "Nouh",
          data: [2, 5, 6, 7, 9, 6],
          color: "#2ADEF0",
        }
      ],
      legend: {
        show: true
      },
      stroke: {
        width: 3,
        curve: 'smooth'
      },
      xaxis: {
        categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
          }
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
    }
    if (document.getElementById("line-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("line-chart"), this.options);
      chart.render();
    }
    
  }

}
