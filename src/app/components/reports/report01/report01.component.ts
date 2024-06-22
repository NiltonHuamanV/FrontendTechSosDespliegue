import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ComentarioService } from '../../../services/comentario.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-report01',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report01.component.html',
  styleUrl: './report01.component.css'
})
export class Report01Component implements OnInit {

  barChartOptions:ChartOptions={
  responsive: true,
  };

  barChartLabels: string[] = [];

 barChartType: ChartType = 'bar';

  barChartLegend=true;
  barChartData: ChartDataset[]=[];

  constructor(private cS: ComentarioService ){}
  ngOnInit(): void {
    this.cS.getTop5Talleres().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombre_taller);
      this.barChartData = [
        {
          data: data.map((item) => item.promediocalificacion),
          label: 'Promedio calificacion',
          backgroundColor: [
            '#00FFF3',
            '#00E4FF',
            '#00C9FF',
            '#00A2FF',
            '#0083FF',
            '#0068FF',
            '#004DFF',
            '#0013FF',
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
}

}
