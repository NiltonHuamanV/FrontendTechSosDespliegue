import { Injectable } from '@angular/core';
import { environment } from '../../environments/envirorment';
import { Observable, Subject } from 'rxjs';
import { Reparacion } from '../models/reparacion';
import { HttpClient } from '@angular/common/http';
import { SumTotalCostoByModeloDTO } from '../models/sumTotalCostoByModeloDTO';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ReparacionService {
  private url = `${base_url}/reparacion`;
  private listaCambio = new Subject<Reparacion[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<Reparacion[]>(this.url);
  }
  insert(p: Reparacion) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: Reparacion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.httpClient.get<Reparacion>(`${this.url}/${id}`);
  }
  update(c: Reparacion) {
    return this.httpClient.put(this.url, c);
  }
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  getQuantityReporte06():Observable<SumTotalCostoByModeloDTO[]>{
    return this.httpClient.get<SumTotalCostoByModeloDTO[]>(`${this.url}/sumtotalcostopormodelo`)
  }
}
