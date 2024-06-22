import { Injectable } from '@angular/core';
import { environment } from '../../environments/envirorment';
import { HttpClient } from '@angular/common/http';
import { Modelo } from '../models/modelo';
import { Subject } from 'rxjs';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  private url = `${base_url}/modelo`
  private listaCambio = new Subject<Modelo[]>();
  constructor(private httpClient:HttpClient) { }
  
  list(){
    return this.httpClient.get<Modelo[]>(this.url)
  }
  insert(p: Modelo) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: Modelo[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Modelo>(`${this.url}/${id}`);
  }

  update(m: Modelo) {
    return this.httpClient.put(this.url, m);
  }
  
  delete(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
