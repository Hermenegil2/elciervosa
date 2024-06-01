import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Carga } from 'src/app/model/carga';
import { CargaService } from 'src/app/service/carga.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-carga',
  templateUrl: './add-carga.component.html',
  styleUrls: ['./add-carga.component.css']
})
export class AddCargaComponent {

  private estado = false;
  public carga: Carga = new Carga();
  public button = "";

  constructor(
    public dialogRef: MatDialogRef<AddCargaComponent>,
    private cargaService: CargaService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.carga.id = 0;
      if(data.carga) {
        this.button = "MODIFICAR";
        this.carga = this.data.carga;
      } else {
        this.button = "REGISTRAR";
      }
    }

  cerrar() {
    this.dialogRef.close();
  }

  save() {
    if(!this.estado) {
      this.estado = true;
      if(this.carga.id == 0) {
        this.cargaService.save(this.carga).subscribe( res => {
          this.alertaSuccess(res.message, "success");
          this.cerrar();
          this.estado = false;
        }, err => {
          this.estado = false;
          this.alertaSuccess(err.error.message, "warning");
        });
      } else {
        this.cargaService.update(this.carga).subscribe( res => {
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
