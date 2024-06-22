import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarmodeloComponent } from './listarmodelo/listarmodelo.component';

@Component({
  selector: 'app-modelo',
  standalone: true,
  imports: [RouterOutlet,ListarmodeloComponent],
  templateUrl: './modelo.component.html',
  styleUrl: './modelo.component.css'
})
export class ModeloComponent implements OnInit {
  constructor (public route: ActivatedRoute){}
ngOnInit(): void {
  
}

}
