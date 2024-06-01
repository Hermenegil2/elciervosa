import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private estado = false;
  constructor(
    private  userService:  UserService,
    private _router: Router) {
     this.getFecha();
    }
    getFecha() {
        this.estado = true;
        if (this.userService.token != null) {
          if (this.isTokenExpirado()) {
            this._router.navigateByUrl('/login', { replaceUrl: true });
          } else {
            this._router.navigateByUrl('/list-orden-carga', { replaceUrl: true });
          }
        } else {
            this._router.navigateByUrl('/', { replaceUrl: true });
        }

   }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (this.estado) {
          return true;
      } else {
        return false;
      }
  }


  isTokenExpirado(): boolean {
    var token: any;
    token = this.userService.token;
    const payload = this.userService.obtenerDatosToken(token);
    const now = new Date().getTime() / 1000;
    if (payload.exp < now) {
      return true;
    }
    return false;
  }


}