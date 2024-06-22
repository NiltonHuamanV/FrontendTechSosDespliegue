import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TallerService } from '../../../services/taller.service';
import { Taller } from '../../../models/taller';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listartaller',
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
  templateUrl: './listartaller.component.html',
  styleUrl: './listartaller.component.css'
})

export class ListartallerComponent implements OnInit {


  displayedColumns: String[] =
  ['codigo',
  'taller',
  'numerodetelefono',
  'direccion',
  'distrito',
  'modificar',
  'eliminar'];

  dataSource:MatTableDataSource<Taller> = new MatTableDataSource()

  constructor(private tS:TallerService, private snackBar:MatSnackBar,
    private loginService: LoginService,
  ) {
  }

  role: string = '';

  ngOnInit(): void {
    this.tS.list().subscribe(data=> {
      this.dataSource = new MatTableDataSource(data)
    })
    this.tS.getlist().subscribe(data=> {
      this.dataSource = new MatTableDataSource(data)
    })

}

deletes(id: number): void {
  this.tS.eliminar(id).subscribe(
    (data) => {
      this.tS.list().subscribe((data)=>{
        this.tS.setlist(data)
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
