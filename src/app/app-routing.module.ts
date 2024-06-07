import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './component/inicio/inicio.component';
import { ContactosComponent } from './component/contactos/contactos.component';
import { NosotrosComponent } from './component/nosotros/nosotros.component';
import { LoginComponent } from './component/usuario/login/login.component';
import { ListOrdenCargaComponent } from './component/orden/list-orden-carga/list-orden-carga.component';
import { CargaOrdenComponent } from './component/orden/carga-orden/carga-orden.component';
import { AuthGuard } from './service/guards/authGuards';
import { ReporteOrdenCargaComponent } from './component/reporte/reporte-orden-carga/reporte-orden-carga.component';
import { ReporteCamionesComponent } from './component/reporte/reporte-camiones/reporte-camiones.component';
import { ReporteComponent } from './component/reporte/reporte/reporte.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'list-orden-carga', component: ListOrdenCargaComponent, canActivate: [AuthGuard] },
  { path: 'orden-carga', component: CargaOrdenComponent, canActivate: [AuthGuard] },
  { path: 'reporte', component: ReporteComponent, canActivate: [AuthGuard] },
  { path: 'reporte-orden-carga', component: ReporteOrdenCargaComponent, canActivate: [AuthGuard] },
  { path: 'reporte-camiones', component: ReporteCamionesComponent, canActivate: [AuthGuard] },
  { path: 'contactos', component: ContactosComponent },
  { path: 'nosotros', component: NosotrosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
