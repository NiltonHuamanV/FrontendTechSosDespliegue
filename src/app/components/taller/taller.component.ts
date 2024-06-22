import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartallerComponent } from './listartaller/listartaller.component';

@Component({
  selector: 'app-taller',
  standalone: true,
  imports: [RouterOutlet, ListartallerComponent],
  templateUrl: './taller.component.html',
  styleUrl: './taller.component.css'
})
export class TallerComponent implements OnInit {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
