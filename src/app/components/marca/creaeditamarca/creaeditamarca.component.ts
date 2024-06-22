import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-creaeditamarca',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    ReactiveFormsModule,
    MatSelectModule, 
    CommonModule, 
    MatInputModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './creaeditamarca.component.html',
  styleUrl: './creaeditamarca.component.css'
})
export class CreaeditamarcaComponent implements OnInit{

  form:FormGroup= new FormGroup({});
  brand:Marca = new Marca();

  constructor(
    private formBuilder:FormBuilder,
    private mS:MarcaService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      marca:['',Validators.required],
    }) 
  }

  aceptar():void
  { 
    if(this.form.valid)
      {
        this.brand.nombre = this.form.value.marca;
        this.mS.insert(this.brand).subscribe((data)=>{
          this.mS.list().subscribe((data)=>{
            this.mS.setlist(data)
          })
      });
      this.router.navigate(['marca'])
  }}

}
