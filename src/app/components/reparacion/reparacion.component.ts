import { Component, OnInit } from '@angular/core';
import { ListarreparacionComponent } from './listarreparacion/listarreparacion.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reparacion',
  standalone: true,
  imports: [ListarreparacionComponent, RouterOutlet],
  templateUrl: './reparacion.component.html',
  styleUrl: './reparacion.component.css'
})
export class ReparacionComponent implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {}

}
