import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Camion } from '../model/camion';
import { Chofer } from '../model/chofer';
import { Propietario } from '../model/propietario';
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

   getCamionPag(page: number, pageSize: number): Observable<PaginatedResult<any>> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<any>(this.url + 'camion/paginacion', { params });
  }
  
  getAllReporte() {
    return this.http.get<any>(this.url + 'camion/getAllReporte');
   }

   getIdCamionReporte(id: number) {
    return this.http.get<any>(this.url + 'camion/getIdCamionIdReporte/'+id);
   }

}
