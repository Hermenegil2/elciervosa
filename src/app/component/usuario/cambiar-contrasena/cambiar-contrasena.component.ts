import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent {

  passwordMatchError = false;
  public user = { id: 0, password: '', confirPassword: ''};
  constructor(
    public dialogRef: MatDialogRef<CambiarContrasenaComponent>,
    public userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user.id = data.id;
  }

  cerrar() {
    this.dialogRef.close();
  }

  save(form: NgForm) {
    if (this.user.password !== this.user.confirPassword) {
      this.passwordMatchError = true;
      setTimeout(() => {
        this.passwordMatchError = false;
      }, 2000);
      return;
    } else {
      this.userService.updatePassword(this.user).subscribe(res => {
        this.alertaSuccess(res.message, "success");
        this.cerrar();
      }, er => {this.alertaSuccess(er.error.message, "warning")});

    }
  }

  alertaSuccess(texto: any, tipo: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: tipo,
      title: texto
    });
  }
}
