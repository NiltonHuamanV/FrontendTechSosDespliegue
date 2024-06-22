import { Component, OnInit } from '@angular/core';
import { ListardispositivotallerComponent } from './listardispositivotaller/listardispositivotaller.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dispositivotaller',
  standalone: true,
  imports: [ListardispositivotallerComponent, RouterOutlet],
  templateUrl: './dispositivotaller.component.html',
  styleUrl: './dispositivotaller.component.css'
})
export class DispositivotallerComponent implements OnInit{
  constructor(public route: ActivatedRoute){}
  
  ngOnInit(): void { }

}
