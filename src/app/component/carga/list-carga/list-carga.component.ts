import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCargaComponent } from '../add-carga/add-carga.component';
import { Carga } from 'src/app/model/carga';
import { CargaService } from 'src/app/service/carga.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-carga',
  templateUrl: './list-carga.component.html',
  styleUrls: ['./list-carga.component.css']
})
export class ListCargaComponent {

  carga: Carga[] | undefined;
  public buscar = "";
  public estadoPermiso = 0;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddCargaComponent>,
    private cargaService: CargaService,
    private spinner: NgxSpinnerService) {
      this.estadoPermiso = parseInt(""+sessionStorage.getItem("estado"));
    } 

    ngOnInit() {
      this.list("9999999999");

   }

  openDialogNuevo(): void { 
    let dialogRef = this.dialog.open(AddCargaComponent, { 
      width: '50%',
      height: '50%',
      data: { } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      this.list("9999999999");
    }); 
  } 

  cerrar() {
    this.dialogRef.close();
  }

  pasar(carga: Carga) {
    this.dialogRef.close(carga);
  }

  update(datos: any) {
    let dialogRef = this.dialog.open(AddCargaComponent, { 
      width: '50%',
      height: '50%',
      data: { carga: datos } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      this.list("9999999999");
    });
  }

  
  list(buscar: any) {
    this.spinner.show();
    if(buscar) {
    this.cargaService.getCarga(buscar).subscribe( result => {
      this.carga = result;
      this.spinner.hide();
    }, err => { this.spinner.hide();});
  } else {
    this.cargaService.getCarga("9999999999").subscribe( result => {
      this.carga = result;
      this.spinner.hide();
    }, err => {this.spinner.hide();});
  } 
    }

  delete(id: number) {
    Swal.fire({
      title: "Quieres eliminar carga?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, bórralo!"
    }).then((result) => {
        if (result.isConfirmed) {
          this.cargaService.deleteCarga(id).subscribe(res => {
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
              footer: '<a href="#">El tipo de carga en uso ya no se puede eliminar?</a>'
            });
          });
        }
      });
    
  }
}
