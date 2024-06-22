import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { DispositivoTaller } from '../../../models/dispositivotaller';
import { DispositivotallerService } from '../../../services/dispositivotaller.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { LoginService } from '../../../services/login.service';


@Component({
  selector: 'app-listardispositivotaller',
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
  templateUrl: './listardispositivotaller.component.html',
  styleUrl: './listardispositivotaller.component.css'
})
export class ListardispositivotallerComponent implements OnInit{
  displayedColumns: string[] = ['codigo', 'dispositivo', 'taller', 'accion01', 'accion02']
  dataSource: MatTableDataSource<DispositivoTaller> = new MatTableDataSource();
  role: string = '';


  constructor(private dtS: DispositivotallerService, private snackBar: MatSnackBar,
    private loginService: LoginService,
  ){}

  ngOnInit(): void {
    this.dtS.list().subscribe(data=> {
      this.dataSource = new MatTableDataSource(data)
    })
    this.dtS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
   }

   eliminar(id: number): void {
    this.dtS.eliminar(id).subscribe(
      (data) => {
        this.dtS.list().subscribe((data)=>{
          this.dtS.setList(data)
        });
      },
      (error) => {
        this.snackBar.open('No fue posible eliminar el registro, ya se encuentra registrado en otro lado', 'Cerrar', {
          duration: 3000 
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

  isCliente() {
    return this.role === 'CLIENTE';
  }


}
