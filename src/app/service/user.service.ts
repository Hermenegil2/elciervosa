import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _token: string | null = null;
  url: string;
  constructor(
    private http: HttpClient) {
    this.url = GLOBAL.url;
   }

   login(usuario: any): Observable<any> {
    return this.http.post<any>(this.url + 'oauth/token', usuario);
  }

  save(user: any) {
    return this.http.post<any>(this.url + 'users/create', user);
  }

  updatePassword(user: any) {
    return this.http.post<any>(this.url + 'users/update', user);
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    sessionStorage.setItem("codigo", payload.id);
    sessionStorage.setItem("estado", payload.admin);
    sessionStorage.setItem("name", payload.nombre);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  public get token(): string | null {
    if (this._token === null) {
        this._token = sessionStorage.getItem('token');
    }
    return this._token;
}

  delete(id: number) {
    return this.http.delete<any>(this.url + 'users/eliminar/'+id);
  }

  getAll() {
    return this.http.get<User[]>(this.url + 'users/listado');
   }


}
