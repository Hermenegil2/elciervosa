import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Carga } from '../model/carga';

@Injectable({
  providedIn: 'root'
})
export class CargaService {

  public url: string;
  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

   save(carga: Carga) {
     return this.http.post<any>(this.url + 'carga/create', carga);
   }

   update(carga: Carga) {
    return this.http.put<any>(this.url + 'carga/update', carga);
  }

   getCarga(buscar: string) {
    return this.http.get<Carga[]>(this.url + 'carga/listado/'+buscar);
   }

   deleteCarga(id: number) {
    return this.http.delete<any>(this.url + 'carga/eliminar/'+id);
   }
 
}
