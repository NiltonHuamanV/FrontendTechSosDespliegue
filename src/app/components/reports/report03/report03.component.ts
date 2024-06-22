import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DispositivoService } from '../../../services/dispositivo.service';

@Component({
  selector: 'app-report03',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report03.component.html',
  styleUrl: './report03.component.css'
})
export class Report03Component implements OnInit{

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private dS:DispositivoService) {}

    ngOnInit(): void {
      this.dS.getQuantityReport03().subscribe(data => {
        const talleres = Array.from(new Set(data.map(item => item.nombreTaller))); 
        const estados = Array.from(new Set(data.map(item => item.estado))); 
  
        this.barChartLabels = talleres; 
  
        this.barChartData = estados.map(estado => ({
          data: talleres.map(taller => {
            const dato = data.find(item => item.nombreTaller === taller && item.estado === estado);
            return dato ? dato.cantidadDispositivos : 0;
          }),
          label: estado,
          backgroundColor: this.getColorForEstado(estado), 
          borderWidth: 1
        }));
      });
    }

    private getColorForEstado(estado: string): string {
      switch (estado) {
        case 'reparado':
          return '#8064A2';
        case 'en proceso':
          return '#4BACC6';
        case 'pendiente':
          return '#4F81BC';
        default:
          return '#CCCCCC';
      }
    }

}
