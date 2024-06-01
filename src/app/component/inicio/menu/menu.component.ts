import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  isMobile!: boolean;
  currentRoute: string = '';
  message: string = '';

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  checkRoute(route: string) {
    if (route === '/list-orden-carga') {
      this.message = 'Bienvenido a la lista de órdenes de carga';
    } else {
      this.message = 'no estoy';
    }
  }

}
