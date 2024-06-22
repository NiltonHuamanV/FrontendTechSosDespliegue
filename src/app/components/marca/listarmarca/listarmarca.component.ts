import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca.service';
import { RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { CommonModule, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { error } from 'node:console';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarmarca',
  standalone: true,
  imports: [
    MatTableModule,
    RouterLink,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './listarmarca.component.html',
  styleUrl: './listarmarca.component.css'
})
export class ListarmarcaComponent implements OnInit{
  marcas: Marca[] = [];

  role: string = '';


  displayedColumns: string[] = [
    'codigo',
    'marca'
  ];

  dataSource:MatTableDataSource<Marca> = new MatTableDataSource();
  constructor(private mS:MarcaService, private snackbar: MatSnackBar,
    private loginService: LoginService,
  ){}

  ngOnInit(): void {
    this.mS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.mS.getlist().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    });
    this.cargarMarcas();
    this.mS.getlist().subscribe((marcas: Marca[]) => {
      this.marcas = marcas;
      this.dataSource = new MatTableDataSource(marcas);
    });
  }

  cargarMarcas(): void {
    this.mS.list().subscribe((marcas: Marca[]) => {
      this.marcas = marcas;
      this.dataSource = new MatTableDataSource(marcas);
    });
  }

  eliminar(id: number) {
    this.mS.eliminar(id).subscribe((data) => {
      this.mS.list().subscribe((data) => {
        this.mS.setlist(data);
      });
    },
    (error) => {
      this.snackbar.open('No fue posible eliminar el registro, ya se encuentra registrado en otro lado', 'Cerrar', {
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
