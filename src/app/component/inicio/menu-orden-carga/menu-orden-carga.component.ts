import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ListUsuarioComponent } from '../../usuario/list-usuario/list-usuario.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-orden-carga',
  templateUrl: './menu-orden-carga.component.html',
  styleUrls: ['./menu-orden-carga.component.css']
})
export class MenuOrdenCargaComponent {

  public estado = false;
  public name = "";

  constructor(
    private router: Router,
    public dialog: MatDialog) {
      let esta = parseInt(""+sessionStorage.getItem("estado"));
      this.name = sessionStorage.getItem("name")+"";
      if(esta == 1) {
        this.estado = true;
      } else if(esta == 0) {
        this.estado = false;
      }
    }

  cerrar() {
    Swal.fire({
      title: "Seguros que quiere cerrar sessión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cerrar sessión!"
    }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Sessión!",
            text: "La sessión ha sido cerrada.",
            icon: "success"
          });

          sessionStorage.clear();
          this.router.navigateByUrl('/', { replaceUrl: true });
          
        }
      });
    
  }

  openDialog(): void { 
    let dialogRef = this.dialog.open(ListUsuarioComponent, { 
      width: '70%',
      height: '80%',
      data: { } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      
    }); 
  } 



}
