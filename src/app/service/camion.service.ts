import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Camion } from '../model/camion';
import { Chofer } from '../model/chofer';
import { Propietario } from '../model/propietario';

@Injectable({
  providedIn: 'root'
})
export class CamionService {

  public url: string;
  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

   save(camion: Camion) {
     return this.http.post<any>(this.url + 'camion/create', camion);
   }

   update(camion: Camion) {
    return this.http.put<any>(this.url + 'camion/update', camion);
  }

   getCamion(buscar: string) {
    return this.http.get<Camion[]>(this.url + 'camion/listado/'+buscar);
   }

   getChoferId(id: any) {
    return this.http.get<Chofer>(this.url + 'camion/chofer/'+id);
   }

   getPropietarioId(id: any) {
    return this.http.get<Propietario>(this.url + 'camion/propietario/'+id);
   }

   getMarcaId(id: any) {
    return this.http.get<any>(this.url + 'camion/marca/'+id);
   }

   deleteCamion(id: number) {
    return this.http.delete<any>(this.url + 'camion/eliminar/'+id);
   }

}
