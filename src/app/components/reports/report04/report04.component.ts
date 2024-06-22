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
        //stacked: true 
      },
      y: {
        stacked: false // Para no apilar las barras en el eje Y
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
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataset[] = [];

  constructor(private dS: DispositivoService) {}

  ngOnInit(): void {
    this.dS.getQuantityReport04().subscribe(data => {
      const marcasModelos: MarcasModelos = {};
  
      // Agrupar datos por marca, modelo y taller
      data.forEach(item => {
        const key = `${item.nombreMarca} - ${item.nombreModelo}`;
        if (!marcasModelos[key]) {
          marcasModelos[key] = {}; 
        }
        marcasModelos[key][item.nombreTaller] = item.cantidadDispositivos;
      });
  
      this.barChartLabels = Object.keys(marcasModelos); 
  
      // Generar datos para cada taller
      const talleres = Array.from(new Set(data.map(item => item.nombreTaller)));
      this.barChartData = talleres.map(taller => ({
        label: taller,
        data: this.barChartLabels.map(label => marcasModelos[label][taller] || 0),
        backgroundColor: this.getRandomColor(),
        borderWidth: 1,
      }));
    });
  }
  

  /*ngOnInit(): void {
    this.dS.getQuantityReport04().subscribe(data => {
      const marcas = Array.from(new Set(data.map(item => item.nombreMarca)));
      const talleres = Array.from(new Set(data.map(item => item.nombreTaller)));

      // Combinar marcas y modelos en etiquetas únicas
      this.barChartLabels = data.map(item => `${item.nombreMarca} - ${item.nombreModelo}`);

      this.barChartData = talleres.map(taller => ({
        label: taller,
        data: this.barChartLabels.map(label => {
          const [marca, modelo] = label.split(' - ');
          const dato = data.find(item => item.nombreTaller === taller && item.nombreMarca === marca && item.nombreModelo === modelo);
          return dato ? dato.cantidadDispositivos : 0;
        }),
        backgroundColor: this.getRandomColor(),
        borderWidth: 1,
      }));
    });
  }*/

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  /*ngOnInit(): void {
    this.dS.getQuantityReport04().subscribe(data => {
      this.barChartLabels = data.map(item => item.nombreTaller)
      this.barChartData = [
        {
          data:data.map(item => item.cantidadDispositivos),
          label:'Cantidad',
          backgroundColor:[
            '#8064A2',
            '#4BACC6',
            '#4F81BC',
          ],
          borderColor:'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        }
      ]
    })
  }*/

}
