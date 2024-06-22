import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DispositivoService } from '../../../services/dispositivo.service';
import { Dispositivo } from '../../../models/dispositivo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-listardispositivo',
  standalone: true,
  imports: [MatTableModule,RouterLink,MatButtonModule, NgIf, MatIconModule],
  templateUrl: './listardispositivo.component.html',
  styleUrl: './listardispositivo.component.css'
})
export class ListardispositivoComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'modelo', 'observaciones','modificar', 'eliminar']
  datasource : MatTableDataSource<Dispositivo>= new MatTableDataSource()
  constructor(
    private dS:DispositivoService,
    private snackBar: MatSnackBar,
    private loginService: LoginService,
  ){}

  role: string = '';

  ngOnInit(): void {
    this.dS.list().subscribe(data=> {
      this.datasource = new MatTableDataSource(data)
    })
    this.dS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }
  deletes(id: number): void {
    this.dS.delete(id).subscribe(
      (data) => {
        this.dS.list().subscribe((data)=>{
          this.dS.setList(data)
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
