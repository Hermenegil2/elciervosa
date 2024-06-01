import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'; 
import { AddClienteComponent } from '../add-cliente/add-cliente.component';
import { ClienteService } from 'src/app/service/cliente.service';
import { Cliente } from 'src/app/model/cliente';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {

  cliente: Cliente[] | undefined;
  public buscar = "";
  public estadoPermiso = 0;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddClienteComponent>,
    private clienteService: ClienteService,
    private spinner: NgxSpinnerService) {

    this.estadoPermiso = parseInt(""+sessionStorage.getItem("estado"));
    } 

    ngOnInit() {
      this.list("9999999999");
     }

  openDialogNuevo(): void { 
    let dialogRef = this.dialog.open(AddClienteComponent, { 
      width: '70%',
      height: '80%',
      data: { } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      this.list("9999999999");
    }); 
  } 

  cerrar() {
    this.dialogRef.close();
  }

  pasar(cliente: Cliente) {
    this.dialogRef.close(cliente);
  }

  
  list(buscar: any) {
    this.spinner.show();
    if(buscar) {
    this.clienteService.getCliente(buscar).subscribe( result => {
      this.cliente = result;
      this.spinner.hide();
    }, err => { this.spinner.hide();});
  } else {
    this.clienteService.getCliente("9999999999").subscribe( result => {
      this.cliente = result;
      this.spinner.hide();
    }, err => {this.spinner.hide();});
  } 
    }

  update(datos: any) {
    let dialogRef = this.dialog.open(AddClienteComponent, { 
      width: '70%',
      height: '80%',
      data: { cliente: datos } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      this.list("9999999999");
    });
  }

  delete(id: number) {
    Swal.fire({
      title: "Quieres eliminar cliente?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, bórralo!"
    }).then((result) => {
        if (result.isConfirmed) {
          this.clienteService.deleteCliente(id).subscribe(res => {
            this.list("9999999999");
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
              footer: '<a href="#">El cliente en uso ya no se puede eliminar?</a>'
            });
          });
        }
      });
    
  }


}
