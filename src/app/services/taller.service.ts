import { Injectable } from '@angular/core';
import { environment } from '../../environments/envirorment';
import { Taller } from '../models/taller';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';

const base_url = environment.base


@Injectable({
  providedIn: 'root'
})
export class TallerService {

  private url = `${base_url}/taller`
  private listacambio = new Subject<Taller[]>();


  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Taller[]>(this.url)
  }

  insert(t: Taller){
    return this.http.post(this.url, t)
  }

  setlist(listaNueva: Taller[]){
    this.listacambio.next(listaNueva)
  }

  getlist(){
    return this.listacambio.asObservable();
  }


  listId(id: number) {
    return this.http.get<Taller>(`${this.url}/${id}`);
  }
  update(t: Taller) {
    return this.http.put(this.url, t);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
