import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardistrictComponent } from './listardistrict/listardistrict.component';

@Component({
  selector: 'app-district',
  standalone: true,
  imports: [RouterOutlet, ListardistrictComponent],
  templateUrl: './district.component.html',
  styleUrl: './district.component.css'
})
export class DistrictComponent implements OnInit {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void { }
}
