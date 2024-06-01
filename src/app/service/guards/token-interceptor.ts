import { Injectable, Injector } from '@angular/core';
import { HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  constructor(private authService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const token = this.authService.token;

    if (token != null) {
      if(!this.isTokenExpirado()) {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', token)
        });
        return next.handle(authReq);
      }
    }

    return next.handle(req);
  }

  isTokenExpirado(): boolean {
    var token: any;
    token = this.authService.token;
    const payload = this.authService.obtenerDatosToken(token);
    const now = new Date().getTime() / 1000;
    if (payload.exp < now) {
      return true;
    }
    return false;
  }


}