import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Chofer } from '../model/chofer';

@Injectable({
  providedIn: 'root'
})
export class ChoferService {

  public url: string;
  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

   save(chofer: Chofer) {
     return this.http.post<any>(this.url + 'chofer/create', chofer);
   }

   update(chofer: Chofer) {
    return this.http.put<any>(this.url + 'chofer/update', chofer);
  }

   getChofer(buscar: string) {
    return this.http.get<Chofer[]>(this.url + 'chofer/listado/'+buscar);
   }

   deleteChofer(id: number) {
    return this.http.delete<any>(this.url + 'chofer/eliminar/'+id);
   }
}
