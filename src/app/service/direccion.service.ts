import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Direccion } from '../model/direccion';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  public url: string;
  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

   save(direccion: Direccion) {
     return this.http.post<any>(this.url + 'direccion/create', direccion);
   }

   update(direccion: Direccion) {
    return this.http.put<any>(this.url + 'direccion/update', direccion);
  }

   getDireccion(buscar: string) {
    return this.http.get<Direccion[]>(this.url + 'direccion/listado/'+buscar);
   }

   
   deleteDireccion(id: number) {
    return this.http.delete<any>(this.url + 'direccion/eliminar/'+id);
   }
}
