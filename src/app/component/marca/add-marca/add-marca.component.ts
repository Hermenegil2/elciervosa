import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Marca } from 'src/app/model/marca';
import { MarcaService } from 'src/app/service/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-marca',
  templateUrl: './add-marca.component.html',
  styleUrls: ['./add-marca.component.css']
})
export class AddMarcaComponent {

  private estado = false;
  public marca: Marca = new Marca();
  public button = "";

  constructor(
    public dialogRef: MatDialogRef<AddMarcaComponent>,
    private marcaService: MarcaService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.marca.id = 0;
      if(data.marca) {
        this.button = "MODIFICAR";
        this.marca = this.data.marca;
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
      if(this.marca.id == 0) {
        this.marcaService.save(this.marca).subscribe( res => {
          this.alertaSuccess(res.message, "success");
          this.cerrar();
          this.estado = false;
        }, err => {
          this.estado = false;
          this.alertaSuccess(err.error.message, "warning");
        });
      } else {
        this.marcaService.update(this.marca).subscribe( res => {
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
