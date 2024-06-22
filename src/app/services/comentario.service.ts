import { Injectable } from '@angular/core';
import { environment } from '../../environments/envirorment';
import { ComentarioClienteTaller } from '../models/comentario';
import { Subject } from 'rxjs/internal/Subject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Top5TalleresDTO } from '../models/top5TalleresDTO';
import { MejoresTalleresDTO } from '../models/mejoresTalleres';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private url = `${base_url}/comentarios`
  private listacambio = new Subject<ComentarioClienteTaller[]>();

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<ComentarioClienteTaller[]>(this.url)
  }

  insert(c: ComentarioClienteTaller){
    return this.http.post(this.url, c)
  }

  setlist(listaNueva: ComentarioClienteTaller[]){
    this.listacambio.next(listaNueva)
  }

  getlist(){
    return this.listacambio.asObservable();
  }


  listId(id: number) {
    return this.http.get<ComentarioClienteTaller>(`${this.url}/${id}`);
  }
  update(c: ComentarioClienteTaller) {
    return this.http.put(this.url, c);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getTop5Talleres():Observable<Top5TalleresDTO[]>{
    return this.http.get<Top5TalleresDTO[]>(`${this.url}/top5Talleres`);
  }

  getMejoresTalleres():Observable<MejoresTalleresDTO[]>{
    return this.http.get<MejoresTalleresDTO[]>(`${this.url}/mejoresTalleres`);
  }

}
