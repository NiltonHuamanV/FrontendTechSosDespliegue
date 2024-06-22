import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule } from '@angular/material/table';
import { District } from '../../../models/district';
import { DistrictService } from '../../../services/district.service';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';
@Component({
  selector: 'app-listardistrict',
  standalone: true,
  imports: [MatTableModule, NgIf,MatButtonModule, RouterLink, MatIconModule ],
  templateUrl: './listardistrict.component.html',
  styleUrl: './listardistrict.component.css'
})
export class ListardistrictComponent implements OnInit{
  role: string = '';
  displayedColumns: String[] = ['codigo', 'distrito','eliminar'];
  dataSource:MatTableDataSource<District> = new MatTableDataSource()
  constructor(private dS:DistrictService, private snackBar: MatSnackBar,
    private loginService: LoginService,
  ) {
  }
  ngOnInit(): void {
    this.dS.list().subscribe(data=> {
      this.dataSource = new MatTableDataSource(data)
    })
    this.dS.getlist().subscribe(data=> {
      this.dataSource = new MatTableDataSource(data)
    })
}

deletes(id: number): void {
  this.dS.delete(id).subscribe(
    (data) => {
      this.dS.list().subscribe((data) => {
        this.dS.setlist(data);
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

