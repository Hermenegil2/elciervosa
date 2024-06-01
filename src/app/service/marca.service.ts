import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Marca } from '../model/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  public url: string;
  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

   save(marca: Marca) {
     return this.http.post<any>(this.url + 'marca/create', marca);
   }

   update(marca: Marca) {
    return this.http.put<any>(this.url + 'marca/update', marca);
  }

   getMarca(buscar: string) {
    return this.http.get<Marca[]>(this.url + 'marca/listado/'+buscar);
   }

   deleteMarca(id: number) {
    return this.http.delete<any>(this.url + 'marca/eliminar/'+id);
   }
 
}
