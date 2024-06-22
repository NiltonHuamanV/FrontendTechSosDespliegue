import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DispositivoService } from '../../../services/dispositivo.service';

interface MarcasModelos {
  [marcaModelo: string]: { [taller: string]: number };
}

@Component({
  selector: 'app-report04',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report04.component.html',
  styleUrl: './report04.component.css'
})
export class Report04Component {

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
      },
      y: {
        stacked: false
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return `${label}: ${value}`;
          }
        }
      }
    }
  };

  barChartLabels: string[] = [];

  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataset[] = [];

  constructor(private dS: DispositivoService) {}

  ngOnInit(): void {
    this.dS.getQuantityReport04().subscribe(data => {
      const marcasModelos: MarcasModelos = {};
      data.forEach(item => {
        const key = `${item.nombreMarca} - ${item.nombreModelo}`;
        if (!marcasModelos[key]) {
          marcasModelos[key] = {}; 
        }
        marcasModelos[key][item.nombreTaller] = item.cantidadDispositivos;
      });
  
      this.barChartLabels = Object.keys(marcasModelos); 

      const talleres = Array.from(new Set(data.map(item => item.nombreTaller)));
      this.barChartData = talleres.map(taller => ({
        label: taller,
        data: this.barChartLabels.map(label => marcasModelos[label][taller] || 0),
        backgroundColor: this.getRandomColor(),
        borderWidth: 1,
      }));
    });
  }
  


  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
