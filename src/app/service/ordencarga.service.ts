import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { OrdenCarga } from '../model/ordenCarga';
import { Observable } from 'rxjs';

interface PaginatedResult<T> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  items: T[];
}

@Injectable({
  providedIn: 'root'
})
export class OrdencargaService {

  public url: string;
  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

   save(ordenCarga: any) {
     return this.http.post<any>(this.url + 'ordenCarga/create', ordenCarga);
   }

   cancelar(ordenCarga: any) {
    const orden = {id: ordenCarga }
    return this.http.put<any>(this.url + 'ordenCarga/cancelar', orden);
  }

   delete(id: number) {
    return this.http.delete<any>(this.url + 'ordenCarga/eliminar/'+id);
   }

   getOrdenCarga(buscar: string) {
    return this.http.get<any>(this.url + 'ordenCarga/listado/'+buscar);
   }

   getOrdenCargaPag(page: number, pageSize: number): Observable<PaginatedResult<any>> {
        let params = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('pageSize', pageSize.toString());

    return this.http.get<any>(this.url + 'ordenCarga/paginacion', { params });
   }

   getOrdenCargaIdReport(id: number) {
    return this.http.get<any>(this.url + 'ordenCarga/reporte/'+id);
   }
 
}
