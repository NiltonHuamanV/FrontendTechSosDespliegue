import { Injectable } from '@angular/core';
import { environment } from '../../environments/envirorment';
import { DispositivoTaller } from '../models/dispositivotaller';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class DispositivotallerService {

  private url = `${base_url}/dispositivotaller`
  private listaCambio = new Subject<DispositivoTaller[]>();

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<DispositivoTaller[]>(this.url);
  }
  insert(p: DispositivoTaller) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: DispositivoTaller[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<DispositivoTaller>(`${this.url}/${id}`);
  }
  update(c: DispositivoTaller) {
    return this.httpClient.put(this.url, c);
  }
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
