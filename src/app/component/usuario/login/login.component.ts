import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userLogin = {username: '', password: ''};
  error: string | undefined;

  constructor(
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService) {
    }
    

    loginUser() {
      this.spinner.show();
      if (this.userLogin.username == null || this.userLogin.password == null) {
        this.error = 'Error Login Username o password vacías!';
          setTimeout(() => {
            this.error = '';
          }, 4000);
        return;
      }
      this.userService.login(this.userLogin).subscribe(response => {
        this.userService.guardarUsuario(response.data.session_token);
        this.userService.guardarToken(response.data.session_token);
        this.router.navigateByUrl('/list-orden-carga', { replaceUrl: true });
        this.spinner.hide();
      }, err => {
          this.alertaSuccess(err.error.message, "warning");
          this.spinner.hide();
      }
      );
  
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
