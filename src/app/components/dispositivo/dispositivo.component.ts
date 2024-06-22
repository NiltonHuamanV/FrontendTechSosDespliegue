import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardispositivoComponent } from './listardispositivo/listardispositivo.component';

@Component({
  selector: 'app-dispositivo',
  standalone: true,
  imports: [RouterOutlet,ListardispositivoComponent],
  templateUrl: './dispositivo.component.html',
  styleUrl: './dispositivo.component.css'
})
export class DispositivoComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void { }

}
