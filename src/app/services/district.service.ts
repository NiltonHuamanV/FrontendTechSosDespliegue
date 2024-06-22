import { Injectable } from '@angular/core';
import { environment } from '../../environments/envirorment';
import { HttpClient } from '@angular/common/http';
import { District } from '../models/district';
import { Subject } from 'rxjs';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private url = `${base_url}/distrito`
  private listCambio = new Subject<District[]>();
  constructor(private http:HttpClient) { }
  list()
  {
    return this.http.get<District[]>(this.url)
  }
  insert(d:District)
  {
    return this.http.post(this.url, d)
  }
  setlist(listaNueva:District[])
  {
    this.listCambio.next(listaNueva)
  }
  getlist()
  {
    return this.listCambio.asObservable();
  }
   
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
