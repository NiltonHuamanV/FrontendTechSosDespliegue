import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ReparacionService } from '../../../services/reparacion.service';

@Component({
  selector: 'app-report06',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report06.component.html',
  styleUrl: './report06.component.css'
})
export class Report06Component implements OnInit {
  
  barChartOptions:ChartOptions={
    responsive: true,
    };
    
    barChartLabels: string[] = [];

  barChartType: ChartType = 'line';
 
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
 
  constructor(private rS:ReparacionService){}
  ngOnInit(): void { 
    this.rS.getQuantityReporte06().subscribe(data =>{
      this.barChartLabels = data.map(item=>item.modelo)
      this.barChartData=[
        {
          data:data.map(item=>item.total),
          label:'Total de costos',
          backgroundColor:[   '#4BACC6', '#4F81BC','#C0504D',],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        }
      ] 
    })

  }
}
