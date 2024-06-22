import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DispositivoService } from '../../../services/dispositivo.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-report05',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report05.component.html',
  styleUrl: './report05.component.css'
})
export class Report05Component implements OnInit {
  
  barChartOptions:ChartOptions={
    responsive: true,
    };
    
  barChartLabels: string[] = [];

  barChartType: ChartType = 'pie';
 
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
 
  constructor(private dS:DispositivoService){}
  ngOnInit(): void { 
    this.dS.getQuantityReporte05().subscribe(data=>{
      this.barChartLabels=data.map(item=>item.modelo )
      this.barChartData=[
        {
          data:data.map(item=>item.cantidad),
          label:'Cantidad de dispositivos defectuosos',
          backgroundColor:[   '#4BACC6', '#4F81BC','#C0504D',],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        }
      ] 
    })
  }
}
