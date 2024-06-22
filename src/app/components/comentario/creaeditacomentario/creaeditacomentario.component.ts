import { NgIf, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ComentarioClienteTaller } from '../../../models/comentario';
import { ComentarioService } from '../../../services/comentario.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Taller } from '../../../models/taller';
import { TallerService } from '../../../services/taller.service';


@Component({
  selector: 'app-creaeditacomentario',
  standalone: true,
  imports: [
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
    MatDatepickerModule
  ],
  templateUrl: './creaeditacomentario.component.html',
  styleUrl: './creaeditacomentario.component.css'
})

export class CreaeditacomentarioComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  comentario: ComentarioClienteTaller = new ComentarioClienteTaller();
  id: number = 0;
  edicion: boolean = false;
  listaTalleres: Taller[] = [];
  mensaje: string = '';




  constructor(
    private cS: ComentarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private TaS :TallerService,

  ) {}


  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
       this.id = data['id'];
       this.edicion = data['id'] != null;
       this.init();
     });


     this.form = this.formBuilder.group({
      codigo: [''],
      descripcion: ['', Validators.required],
      calificacion: ['',
      [
        Validators.required,
        Validators.min(0),
        Validators.max(10),
        Validators.pattern('^[0-9]*$'),
      ],
        ],
      fechaComentario: ['', Validators.required],
      taller: ['', Validators.required],
    });

    this.TaS.list().subscribe((data) => {
      this.listaTalleres = data;
    });
}

aceptar(): void {
  if (this.form.valid) {
    this.comentario.idComentario_Cliente_Taller = this.form.value.codigo;
    this.comentario.descripcion = this.form.value.descripcion;
    this.comentario.calificacion = this.form.value.calificacion;
    this.comentario.fechaComentario = this.form.value.fechaComentario;
    this.comentario.taller.idTaller = this.form.value.taller;
    if (this.edicion) {
      this.cS.update(this.comentario).subscribe(() => {
        this.cS.list().subscribe((data) => {
          this.cS.setlist(data);
        });
      });
    } else {
      this.cS.insert(this.comentario).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setlist(data);
        });
      });
    }
    this.router.navigate(['comentarios']);
  }
}


init() {
  if (this.edicion) {
    this.cS.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        codigo: new FormControl(data.idComentario_Cliente_Taller),
        descripcion: new FormControl(data.descripcion),
        calificacion: new FormControl(data.calificacion),
        fechaComentario: new FormControl(data.fechaComentario),
        taller: new FormControl(data.taller.idTaller),

      });
    });
  }
}


}

