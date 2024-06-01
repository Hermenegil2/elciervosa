import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContactosComponent } from './component/contactos/contactos.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { AppRoutingModule } from './app-routing.module';
import { NosotrosComponent } from './component/nosotros/nosotros.component';
import { LoginComponent } from './component/usuario/login/login.component';
import { ListOrdenCargaComponent } from './component/orden/list-orden-carga/list-orden-carga.component';
import { ListClienteComponent } from './component/cliente/list-cliente/list-cliente.component';
import { AddClienteComponent } from './component/cliente/add-cliente/add-cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ListCargaComponent } from './component/carga/list-carga/list-carga.component';
import { AddCargaComponent } from './component/carga/add-carga/add-carga.component';
import { ListDireccionComponent } from './component/direccion/list-direccion/list-direccion.component';
import { AddDireccionComponent } from './component/direccion/add-direccion/add-direccion.component';
import { ListCamionComponent } from './component/camion/list-camion/list-camion.component';
import { AddCamionComponent } from './component/camion/add-camion/add-camion.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CargaOrdenComponent } from './component/orden/carga-orden/carga-orden.component';
import { ListChoferComponent } from './component/chofer/list-chofer/list-chofer.component';
import { AddChoferComponent } from './component/chofer/add-chofer/add-chofer.component';
import { AddPropietarioComponent } from './component/propietario/add-propietario/add-propietario.component';
import { ListPropietarioComponent } from './component/propietario/list-propietario/list-propietario.component';
import { ListMarcaComponent } from './component/marca/list-marca/list-marca.component';
import { AddMarcaComponent } from './component/marca/add-marca/add-marca.component';
import { AuthGuard } from './service/guards/authGuards';
import { TokenInterceptorService } from './service/guards/token-interceptor';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { DetalleOrdenCargaComponent } from './component/orden/detalle-orden-carga/detalle-orden-carga.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MenuComponent } from './component/inicio/menu/menu.component';
import { MenuOrdenCargaComponent } from './component/inicio/menu-orden-carga/menu-orden-carga.component';
import { ListUsuarioComponent } from './component/usuario/list-usuario/list-usuario.component';
import { AddUsuarioComponent } from './component/usuario/add-usuario/add-usuario.component';
import { CambiarContrasenaComponent } from './component/usuario/cambiar-contrasena/cambiar-contrasena.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactosComponent,
    InicioComponent,
    NosotrosComponent,
    LoginComponent,
    ListOrdenCargaComponent,
    ListClienteComponent,
    AddClienteComponent,
    ListCargaComponent,
    AddCargaComponent,
    ListDireccionComponent,
    AddDireccionComponent,
    ListCamionComponent,
    AddCamionComponent,
    CargaOrdenComponent,
    ListChoferComponent,
    AddChoferComponent,
    AddPropietarioComponent,
    ListPropietarioComponent,
    ListMarcaComponent,
    AddMarcaComponent,
    DetalleOrdenCargaComponent,
    MenuComponent,
    MenuOrdenCargaComponent,
    ListUsuarioComponent,
    AddUsuarioComponent,
    CambiarContrasenaComponent
  ],
  imports: [
    BrowserModule,
    NgxQRCodeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
