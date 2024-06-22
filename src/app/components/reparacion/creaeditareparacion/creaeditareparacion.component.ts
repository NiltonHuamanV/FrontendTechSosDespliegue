import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Reparacion } from '../../../models/reparacion';
import { DispositivoTaller } from '../../../models/dispositivotaller';
import { ReparacionService } from '../../../services/reparacion.service';
import { DispositivotallerService } from '../../../services/dispositivotaller.service';

@Component({
  selector: 'app-creaeditareparacion',
  standalone: true,
  imports: [
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './creaeditareparacion.component.html',
  styleUrl: './creaeditareparacion.component.css'
})
export class CreaeditareparacionComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  reparation: Reparacion = new Reparacion();
  listaReparaciones: Reparacion[] = [];
  listaDispositivos: DispositivoTaller[] = [];

  id:number = 0;
  edicion: boolean=false;

  constructor(private formBuilder:FormBuilder,
    private rS:ReparacionService,
    private dtS:DispositivotallerService,
    private router:Router,
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
      dispositivotaller:['',Validators.required],
      fechainicio:['',Validators.required],
      fechafin:['',Validators.required],
      problema:['',Validators.required],
      estado:['',Validators.required],
      costo:['',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
    this.dtS.list().subscribe((data) => {
      this.listaDispositivos = data;
    });
  }

  aceptar():void {
    if(this.form.valid) {
      this.reparation.idReparacion = this.form.value.codigo;
      this.reparation.dispositivoTaller.idDispositivoTaller = this.form.value.dispositivotaller;
      this.reparation.fechaInicio = this.form.value.fechainicio;
      this.reparation.fechaFin = this.form.value.fechafin;
      this.reparation.problema = this.form.value.problema;
      this.reparation.estado = this.form.value.estado;
      this.reparation.costo = this.form.value.costo;

      if (this.edicion) {
        this.rS.update(this.reparation).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }else{
      this.rS.insert(this.reparation).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      }
      /*this.rS.insert(this.reparation).subscribe((data)=>{
        this.rS.list().subscribe((data)=>{
          this.rS.setList(data)
        })
      });*/

      this.router.navigate(['reparacion'])
    }
  }


  init(){
    if (this.edicion)
      {
        this.rS.listId(this.id).subscribe((data)=> {
          this.form = new FormGroup({
            codigo: new FormControl(data.idReparacion),
            dispositivotaller: new FormControl(data.dispositivoTaller.idDispositivoTaller),
            fechainicio: new FormControl(data.fechaInicio),
            fechafin: new FormControl(data.fechaFin),
            problema: new FormControl(data.problema),
            estado: new FormControl(data.estado),
            costo: new FormControl(data.costo),
          })
        })
      }
  }

}
