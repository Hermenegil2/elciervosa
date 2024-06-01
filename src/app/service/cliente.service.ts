import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Cliente } from '../model/cliente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url: string;
  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

   save(cliente: Cliente) {
     return this.http.post<any>(this.url + 'cliente/create', cliente);
   }

   update(cliente: Cliente) {
    return this.http.put<any>(this.url + 'cliente/update', cliente);
  }

   getCliente(buscar: string) {
    return this.http.get<Cliente[]>(this.url + 'cliente/listado/'+buscar);
   }

   deleteCliente(id: number) {
    return this.http.delete<any>(this.url + 'cliente/eliminar/'+id);
   }
 
}