import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Propietario } from '../model/propietario';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  public url: string;
  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

   save(propietario: Propietario) {
     return this.http.post<any>(this.url + 'propietario/create', propietario);
   }

   update(propietario: Propietario) {
    return this.http.put<any>(this.url + 'propietario/update', propietario);
  }

   getPropietario(buscar: string) {
    return this.http.get<Propietario[]>(this.url + 'propietario/listado/'+buscar);
   }

   deletePropietario(id: number) {
    return this.http.delete<any>(this.url + 'propietario/eliminar/'+id);
   }
}
