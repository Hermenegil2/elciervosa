import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Propietario } from 'src/app/model/propietario';
import { PropietarioService } from 'src/app/service/propietario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-propietario',
  templateUrl: './add-propietario.component.html',
  styleUrls: ['./add-propietario.component.css']
})
export class AddPropietarioComponent {

  private estado = false;
  public button = "";
  public propietario: Propietario = new Propietario();

  constructor(
    public dialogRef: MatDialogRef<AddPropietarioComponent>,
    private propietarioService: PropietarioService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.propietario.id = 0;
      if(data.propietario) {
        this.button = "MODIFICAR"
        this.propietario = this.data.propietario;
      } else {
        this.button = "REGISTRAR"
      }
    }

  cerrar() {
    this.dialogRef.close();
  }

  save() {
    if(!this.estado) {
      this.estado = true;
      if(this.propietario.id == 0) {
        this.propietarioService.save(this.propietario).subscribe( res => {
          this.alertaSuccess(res.message, "success");
          this.cerrar();
          this.estado = false;
        }, err => {
          this.estado = false;
          this.alertaSuccess(err.error.message, "warning");
        });
      } else {
        this.propietarioService.update(this.propietario).subscribe( res => {
          this.alertaSuccess(res.message, "success");
          this.cerrar();
          this.estado = false;
        }, err => {
          this.estado = false;
          this.alertaSuccess(err.error.message, "warning");
        });
      }

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
