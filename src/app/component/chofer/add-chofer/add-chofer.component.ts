import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chofer } from 'src/app/model/chofer';
import { ChoferService } from 'src/app/service/chofer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-chofer',
  templateUrl: './add-chofer.component.html',
  styleUrls: ['./add-chofer.component.css']
})
export class AddChoferComponent {

  private estado = false;
  public chofer: Chofer = new Chofer();
  public button = "";

  constructor(
    public dialogRef: MatDialogRef<AddChoferComponent>,
    private choferService: ChoferService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.chofer.id = 0;
    if(data.chofer) {
      this.button = "MODIFICAR"
      this.chofer = this.data.chofer;
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
      if(this.chofer.id == 0) {
        this.choferService.save(this.chofer).subscribe( res => {
          this.alertaSuccess(res.message, "success");
          this.cerrar();
          this.estado = false;
        }, err => {
          this.estado = false;
          this.alertaSuccess(err.error.message, "warning");
        });
      } else {
        this.choferService.update(this.chofer).subscribe( res => {
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
