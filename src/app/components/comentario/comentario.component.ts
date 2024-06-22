import { Component, OnInit } from '@angular/core';
import { ListarcomentarioComponent } from './listarcomentario/listarcomentario.component';
import { RouterOutlet, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [RouterOutlet, ListarcomentarioComponent],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css'
})
export class ComentarioComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
