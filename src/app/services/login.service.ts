import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtRequest } from '../models/jwtRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(request: JwtRequest) {
    return this.http.post('https://backendtechsosdespliegue.onrender.com/login', request);
  }

  verificar() {
    if (typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined') {
      let token = sessionStorage.getItem('token');
      return token != null;
    }
    return false;
  }

  showRole() {
    if (typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined') {
      let token = sessionStorage.getItem('token');
      if (!token) {
        return null; 
      }
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      return decodedToken?.role;
    }
    return null; 
  }
}
