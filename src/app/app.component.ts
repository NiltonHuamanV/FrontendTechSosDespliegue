import { Component, DoCheck, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { LoginService } from './services/login.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule, 
    RouterLink,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent /*implements OnInit, DoCheck*/{
  title = 'techsos';

  role: string = '';

  /*-----------*/
  /*ngOnInit() {
    this.verificar(); // Verificar si el usuario está autenticado
    this.role = this.loginService.showRole(); // Obtener y actualizar el rol
  }*/
  /*------------*/
  /*ngDoCheck() {
    const nuevoRol = this.loginService.showRole(); 
    if (nuevoRol !== this.role) {
      this.role = nuevoRol;
    }
  }*/

  

  constructor(private loginService: LoginService) {
  }

  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }

  isTecnico() {
    return this.role === 'TECNICO';
  }

  isCliente() {
    return this.role === 'CLIENTE';
  }

  isAdmin() {
    return this.role === 'ADMIN';
  }
}
