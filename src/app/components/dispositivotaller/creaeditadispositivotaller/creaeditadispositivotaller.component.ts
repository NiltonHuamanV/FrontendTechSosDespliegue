import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DispositivoTaller } from '../../../models/dispositivotaller';
import { DispositivotallerService } from '../../../services/dispositivotaller.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { DispositivoService } from '../../../services/dispositivo.service';
import { TallerService } from '../../../services/taller.service';
import { Dispositivo } from '../../../models/dispositivo';
import { Taller } from '../../../models/taller';

@Component({
  selector: 'app-creaeditadispositivotaller',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    ReactiveFormsModule,
    MatSelectModule, 
    CommonModule, 
    MatInputModule,
    MatButtonModule,
    RouterLink,
    NgIf,
  ],
  templateUrl: './creaeditadispositivotaller.component.html',
  styleUrl: './creaeditadispositivotaller.component.css'
})
export class CreaeditadispositivotallerComponent implements OnInit{
  form:FormGroup = new FormGroup({})
  devicetaller:DispositivoTaller = new DispositivoTaller();
  listaDispositivos: Dispositivo[] = [];
  listaTalleres: Taller[] = [];

  id:number = 0;
  edicion: boolean=false;

  constructor(
    private formBuilder:FormBuilder, 
    private dtS: DispositivotallerService,
    private router:Router,
    private dS:DispositivoService,
    private tS:TallerService,
    private route:ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form=this.formBuilder.group({
      codigo:[''],
      dispositivo:['',Validators.required],
      taller:['',Validators.required]
    });
    this.dS.list().subscribe((data) => {
      this.listaDispositivos = data;
    });
    this.tS.list().subscribe((data) => {
      this.listaTalleres = data
    })
  }

  aceptar():void
  {
  if(this.form.valid)
    {
      this.devicetaller.idDispositivoTaller = this.form.value.codigo;
      this.devicetaller.dispositivo.idDispositivo = this.form.value.dispositivo;
      this.devicetaller.taller.idTaller = this.form.value.taller;
      
      if (this.edicion) {
        this.dtS.update(this.devicetaller).subscribe((data) => {
          this.dtS.list().subscribe((data) => {
            this.dtS.setList(data);
          });
        });
      } else {
      this.dtS.insert(this.devicetaller).subscribe((data) => {
        this.dtS.list().subscribe((data) => {
          this.dtS.setList(data);
        });
      });
      }
      this.router.navigate(['dispositivotaller']);
    
  }}

  init(){
    if (this.edicion){
      this.dtS.listId(this.id).subscribe((data)=> {
        this.form = new FormGroup({
          codigo: new FormControl(data.idDispositivoTaller),
          dispositivo: new FormControl(data.dispositivo.idDispositivo),
          taller: new FormControl(data.taller.idTaller),
        })
      })
    }
  }

}
