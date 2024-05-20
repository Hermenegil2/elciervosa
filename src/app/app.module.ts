import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContactosComponent } from './component/contactos/contactos.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { AppRoutingModule } from './app-routing.module';
import { NosotrosComponent } from './component/nosotros/nosotros.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactosComponent,
    InicioComponent,
    NosotrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
