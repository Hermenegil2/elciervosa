import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent {

  private estado = false;
  public cliente: Cliente = new Cliente();
  public button = "";
  constructor(
    public dialogRef: MatDialogRef<AddClienteComponent>,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
      this.cliente.id = 0;
      if(data.cliente) {
        this.button = "MODIFICAR"
        this.cliente = this.data.cliente;
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
      if(this.cliente.id == 0) {
        this.clienteService.save(this.cliente).subscribe( res => {
        this.alertaSuccess(res.message, "success");
        this.cerrar();
        this.estado = false;
      }, err => {
        this.estado = false;
        this.alertaSuccess(err.error.message, "warning")
      });
      } else {
        this.clienteService.update(this.cliente).subscribe( res => {
          this.alertaSuccess(res.message, "success");
          this.cerrar();
          this.estado = false;
        }, err => {
          this.estado = false;
          this.alertaSuccess(err.error.message, "warning")
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