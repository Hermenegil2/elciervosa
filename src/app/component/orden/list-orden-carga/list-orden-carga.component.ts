import { Component, OnInit } from '@angular/core';
import { OrdencargaService } from 'src/app/service/ordencarga.service';
import { DetalleOrdenCargaComponent } from '../detalle-orden-carga/detalle-orden-carga.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-orden-carga',
  templateUrl: './list-orden-carga.component.html',
  styleUrls: ['./list-orden-carga.component.css']
})
export class ListOrdenCargaComponent implements OnInit {

  ordenCargas: any;
  public estadoPermiso = 0;

  public buscar = "";

  constructor(
    private ordenCargaService: OrdencargaService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) { 
    this.estadoPermiso = parseInt(""+sessionStorage.getItem("estado"));
  }

  ngOnInit(): void {
      this.list("9999999999");
  }

  list(buscar: any) {
    this.spinner.show();
    if(buscar) {
    this.ordenCargaService.getOrdenCarga(buscar).subscribe( result => {
      this.ordenCargas = result;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  } else {
    this.ordenCargaService.getOrdenCarga("9999999999").subscribe( result => {
      this.ordenCargas = result;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  } 
    }

    
  openDialogDetalle(id: number): void { 
    this.dialog.open(DetalleOrdenCargaComponent, { 
      data: { id: id } 
    });  
  }
  
  cancelar(id: number) {
    Swal.fire({
      title: "Quieres cancelar la orden?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cancelar!"
    }).then((result) => {
        if (result.isConfirmed) {
          this.ordenCargaService.cancelar(id).subscribe(res => {
            this.list("9999999999");
          Swal.fire({
            title: "Cancelar!",
            text: "La orden de carga ha sido cancelada.",
            icon: "success"
          });
          }, err => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.error.message,
              footer: '<a href="#">El orden en uso ya no se puede cancelar?</a>'
            });
          });
        }
      });
  }

  delete(id: number) {
      Swal.fire({
        title: "Quieres eliminar la orden?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, bórralo!"
      }).then((result) => {
          if (result.isConfirmed) {
            this.ordenCargaService.delete(id).subscribe(res => {
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
                footer: '<a href="#">El orden en uso ya no se puede eliminar?</a>'
              });
            });
          }
        });
  }

}
