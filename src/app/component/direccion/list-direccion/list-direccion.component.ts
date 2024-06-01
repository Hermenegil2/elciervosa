import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddDireccionComponent } from '../add-direccion/add-direccion.component';
import { Direccion } from 'src/app/model/direccion';
import { DireccionService } from 'src/app/service/direccion.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-direccion',
  templateUrl: './list-direccion.component.html',
  styleUrls: ['./list-direccion.component.css']
})
export class ListDireccionComponent implements OnInit {

  public buscar = "";
  direccion: Direccion[] | undefined;
  public estadoPermiso = 0;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddDireccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private direccionService: DireccionService,
    private spinner: NgxSpinnerService) {
      this.estadoPermiso = parseInt(""+sessionStorage.getItem("estado"));
    } 

    
    ngOnInit() {
      this.list("9999999999");
   }

  openDialogNuevo(): void { 
    let dialogRef = this.dialog.open(AddDireccionComponent, { 
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

  pasar(direccion: Direccion) {
    this.dialogRef.close({direccion: direccion, tipo: this.data.tipo});
  }

  update(datos: any) {
    let dialogRef = this.dialog.open(AddDireccionComponent, { 
      width: '50%',
      height: '50%',
      data: { direccion: datos } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      this.list("9999999999");
    });
  }

  
  list(buscar: any) {
    this.spinner.show();
    if(buscar) {
    this.direccionService.getDireccion(buscar).subscribe( result => {
      this.direccion = result;
      this.spinner.hide();
    }, err => {this.spinner.hide();});
  } else {
    this.direccionService.getDireccion("9999999999").subscribe( result => {
      this.direccion = result;
      this.spinner.hide();
    }, err => { this.spinner.hide(); });
  } 
    }


  delete(id: number) {
    Swal.fire({
      title: "Quieres eliminar direccion?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, bórralo!"
    }).then((result) => {
        if (result.isConfirmed) {
          this.direccionService.deleteDireccion(id).subscribe(res => {
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
              footer: '<a href="#">La dirección en uso ya no se puede eliminar?</a>'
            });
          });
        }
      });
    
  }
}
