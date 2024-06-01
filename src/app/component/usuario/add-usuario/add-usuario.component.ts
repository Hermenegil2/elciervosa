import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent {

  public user: User = new User();
  passwordMatchError = false;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<AddUsuarioComponent>,
  ) {
    this.user.admin = false;
  }

  save() {

    if (this.user.password !== this.user.confirmPassword) {
      this.passwordMatchError = true;
      setTimeout(() => {
        this.passwordMatchError = false;
      }, 2000);
      return;
    } else {
      this.userService.save(this.user).subscribe( res => {
        this.alertaSuccess(res.message, "success");
        this.cerrar();
      }, err => {
        this.alertaSuccess(err.error.message, "warning")
      })
    }
  }

  cerrar() {
    this.dialogRef.close();
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
