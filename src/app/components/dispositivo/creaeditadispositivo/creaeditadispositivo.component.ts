import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Dispositivo } from '../../../models/dispositivo';
import { Modelo } from '../../../models/modelo';
import { DispositivoService } from '../../../services/dispositivo.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ModeloService } from '../../../services/modelo.service';
@Component({
  selector: 'app-creaeditadispositivo',
  standalone: true,
  imports: [MatFormFieldModule, 
    ReactiveFormsModule,
    MatSelectModule, 
    CommonModule, 
    MatInputModule,
    MatButtonModule,
    RouterLink],
  templateUrl: './creaeditadispositivo.component.html',
  styleUrl: './creaeditadispositivo.component.css'
})
export class CreaeditadispositivoComponent {
form:FormGroup = new FormGroup({})
dispositivo:Dispositivo = new Dispositivo();
id:number = 0;
edicion: boolean=false;
listaModelos: Modelo[] = [];
constructor(
  private formBuilder:FormBuilder, 
  private dS: DispositivoService,
  private router:Router,
  private route:ActivatedRoute,
  private mS :ModeloService,
){}

ngOnInit():void
{
  
  this.route.params.subscribe((data: Params) => {
    this.id = data['id'];
    this.edicion = data['id'] != null;
    this.init();
  });

  this.form=this.formBuilder.group({
    codigo:[''],
    modelo:['',Validators.required],
    observaciones:['',Validators.required],
  });
  this.mS.list().subscribe((data) => {
    this.listaModelos = data;
  });
}
aceptar():void
{
  if(this.form.valid)
    {
      this.dispositivo.idDispositivo = this.form.value.codigo;
      this.dispositivo.modelo.idmodelo = this.form.value.modelo;
      this.dispositivo.observaciones = this.form.value.observaciones;

      if (this.edicion) {
        this.dS.update(this.dispositivo).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      }else{
      this.dS.insert(this.dispositivo).subscribe((data) => {
        this.dS.list().subscribe((data) => {
          this.dS.setList(data);
        });
      });
    }
      this.router.navigate(['dispositivo']);
    }
}
init(){
  if (this.edicion)
    {
      this.dS.listId(this.id).subscribe((data)=> {
        this.form = new FormGroup({
          codigo: new FormControl(data.idDispositivo),
          modelo: new FormControl(data.modelo.idmodelo),
          observaciones: new FormControl(data.observaciones),
        })
      })
    }
}
}

