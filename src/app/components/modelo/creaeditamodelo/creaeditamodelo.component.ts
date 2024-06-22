import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Modelo } from '../../../models/modelo';
import { ModeloService } from '../../../services/modelo.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca.service';
@Component({
  selector: 'app-creaeditamodelo',
  standalone: true,
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    RouterLink],
  templateUrl: './creaeditamodelo.component.html',
  styleUrl: './creaeditamodelo.component.css'
})
export class CreaeditamodeloComponent implements OnInit {
form:FormGroup = new FormGroup({})
modelo:Modelo = new Modelo();
id:number = 0;
edicion: boolean=false;
listaMarcas: Marca[] = [];

constructor(
  private formBuilder:FormBuilder,
  private mS: ModeloService,
  private router:Router,
  private route:ActivatedRoute,
  private MaS :MarcaService,
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
    marca:['',Validators.required],
  });
  this.MaS.list().subscribe((data) => {
    this.listaMarcas = data;
  });
}


aceptar():void
{
  if(this.form.valid)
    {
      this.modelo.idmodelo = this.form.value.codigo;
      this.modelo.nombre = this.form.value.modelo;
      this.modelo.marca.idmarca = this.form.value.marca;

      if (this.edicion) {
        this.mS.update(this.modelo).subscribe((data) => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }else{
      this.mS.insert(this.modelo).subscribe((data) => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
        });
      });
    }

      this.router.navigate(['modelo']);
    }
}
init(){
  if (this.edicion)
    {
      this.mS.listId(this.id).subscribe((data)=> {
        this.form = new FormGroup({
          codigo: new FormControl(data.idmodelo),
          modelo: new FormControl(data.nombre),
          marca: new FormControl(data.marca.idmarca),
        })
      })
    }
}
}
