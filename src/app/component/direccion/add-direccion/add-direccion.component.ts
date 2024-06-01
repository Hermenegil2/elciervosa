import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Direccion } from 'src/app/model/direccion';
import { DireccionService } from 'src/app/service/direccion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-direccion',
  templateUrl: './add-direccion.component.html',
  styleUrls: ['./add-direccion.component.css']
})
export class AddDireccionComponent {

  private estado = false;
  public button = "";
  public direccion: Direccion = new Direccion();

  constructor(
    public dialogRef: MatDialogRef<AddDireccionComponent>,
    private direccionService: DireccionService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.direccion.id = 0;
      if(data.direccion) {
        this.button = "MODIFICAR"
        this.direccion = this.data.direccion;
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
      if(this.direccion.id == 0) {
        this.direccionService.save(this.direccion).subscribe( res => {
          this.alertaSuccess(res.message, "success");
          this.cerrar();
          this.estado = false;
        }, err => {
          this.estado = false;
          this.alertaSuccess(err.error.message, "warning");
        });
      } else {
        this.direccionService.update(this.direccion).subscribe( res => {
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
