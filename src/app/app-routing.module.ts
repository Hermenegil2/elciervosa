import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './component/inicio/inicio.component';
import { ContactosComponent } from './component/contactos/contactos.component';
import { NosotrosComponent } from './component/nosotros/nosotros.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'contactos', component: ContactosComponent },
  { path: 'nosotros', component: NosotrosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
