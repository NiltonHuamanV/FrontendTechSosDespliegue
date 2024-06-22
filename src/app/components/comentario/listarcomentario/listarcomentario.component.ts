import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ComentarioClienteTaller } from '../../../models/comentario';
import { ComentarioService } from '../../../services/comentario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { LoginService } from '../../../services/login.service';


@Component({
  selector: 'app-listarcomentario',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './listarcomentario.component.html',
  styleUrl: './listarcomentario.component.css'
})

export class ListarcomentarioComponent {
  displayedColumns: string[] = [
    'codigo',
    'descripcion',
    'calificacion',
    'fechaComentario',
    'taller',
    'modificar',
    'eliminar'];

  dataSource: MatTableDataSource<ComentarioClienteTaller> = new MatTableDataSource();


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  role: string = '';

  constructor(private cS: ComentarioService, private snackBar:MatSnackBar,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.cS.list().subscribe(data=> {
      this.dataSource = new MatTableDataSource(data)
    })
    this.cS.getlist().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
}


deletes(id: number): void {
  this.cS.eliminar(id).subscribe(
    (data) => {
      this.cS.list().subscribe((data)=>{
        this.cS.setlist(data)
      });
    },
    (error) => {
      this.snackBar.open('No fue posible eliminar el registro', 'Cerrar', {
        duration: 3000 // Duración del mensaje en milisegundos
      });
    }
  );
}

verificar() {
  this.role = this.loginService.showRole();
  return this.loginService.verificar();
}

isCliente() {
  return this.role === 'CLIENTE';
}


isAdmin() {
  return this.role === 'ADMIN';
}

}



