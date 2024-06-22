import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Modelo } from '../../../models/modelo';
import { ModeloService } from '../../../services/modelo.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-listarmodelo',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, NgIf, MatIconModule],
  templateUrl: './listarmodelo.component.html',
  styleUrl: './listarmodelo.component.css',
})
export class ListarmodeloComponent {
  
  role: string = '';


  displayedColumns: string[] = [
    'codigo',
    'modelo',
    'marca',
    'modificar',
    'eliminar',
  ];
  datasource: MatTableDataSource<Modelo> = new MatTableDataSource();
  constructor(private mS: ModeloService, private snackBar: MatSnackBar,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
    this.mS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }
  deletes(id: number): void {
    this.mS.delete(id).subscribe(
      (data) => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
        });
      },
      (error) => {
        this.snackBar.open('No fue posible eliminar el registro', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }

  isAdmin() {
    return this.role === 'ADMIN';
  }
  
}
