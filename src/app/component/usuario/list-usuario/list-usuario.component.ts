import { Component, OnInit } from '@angular/core';
import { AddUsuarioComponent } from '../add-usuario/add-usuario.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/service/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CambiarContrasenaComponent } from '../cambiar-contrasena/cambiar-contrasena.component';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {

  usuario: User[] | undefined;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ListUsuarioComponent>,
    private userService: UserService,
    private spinner: NgxSpinnerService) {}

    ngOnInit(): void {
        this.list();
    }

  openDialogNuevo(): void { 
    let dialogRef = this.dialog.open(AddUsuarioComponent, { 
      width: '50%',
      data: { } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
        this.list();
    
    }); 
  } 

  openDialog(id: number): void { 
    let dialogRef = this.dialog.open(CambiarContrasenaComponent, { 
      width: '50%',
      data: { id: id } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
        this.list();
    }); 
  } 

  cerrar() {
    this.dialogRef.close();
  }

  list() {
    this.spinner.show();
    this.userService.getAll().subscribe( result => {
      this.usuario = result;
      this.spinner.hide();
    }, err => { this.spinner.hide();});
  
    }

  delete(id: number) {
    Swal.fire({
      title: "Quieres eliminar usuario?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, bórralo!"
    }).then((result) => {
        if (result.isConfirmed) {
          this.userService.delete(id).subscribe(res => {
            this.list();
          Swal.fire({
            title: "Eliminar!",
            text: "Tu datos ha sido eliminado.",
            icon: "success"
          });
          }, err => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.error.message,
              footer: '<a href="#">El usuario en uso ya no se puede eliminar?</a>'
            });
          });
        }
      });
    
  }

}
