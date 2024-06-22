import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Reparacion } from '../../../models/reparacion';
import { ReparacionService } from '../../../services/reparacion.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarreparacion',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    MatInputModule,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './listarreparacion.component.html',
  styleUrl: './listarreparacion.component.css'
})
export class ListarreparacionComponent implements OnInit{

  role: string = '';

  dataSource: MatTableDataSource<Reparacion> = new MatTableDataSource();

  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'modificar',
    'eliminar'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rS: ReparacionService, private snackBar: MatSnackBar,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deletes(id: number): void {
    this.rS.eliminar(id).subscribe(
      (data) => {
        this.rS.list().subscribe((data)=>{
          this.rS.setList(data)
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

  isTecnico() {
    return this.role === 'TECNICO';
  }
  
  
  isAdmin() {
    return this.role === 'ADMIN';
  }
}
