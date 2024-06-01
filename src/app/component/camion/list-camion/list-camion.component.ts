import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCamionComponent } from '../add-camion/add-camion.component';
import { Camion } from 'src/app/model/camion';
import { CamionService } from 'src/app/service/camion.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-camion',
  templateUrl: './list-camion.component.html',
  styleUrls: ['./list-camion.component.css']
})
export class ListCamionComponent implements OnInit {

  public buscar = "";

  camion: Camion[] | undefined;
  public estadoPermiso = 0;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ListCamionComponent>,
    private camionService: CamionService,
    private spinner: NgxSpinnerService) {
      this.estadoPermiso = parseInt(""+sessionStorage.getItem("estado"));
    } 

  ngOnInit(): void {
    this.list("9999999999");
  }

  openDialogNuevo(): void { 
    let dialogRef = this.dialog.open(AddCamionComponent, { 
      width: '100%',
      height: '90%',
      data: { } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      this.list("9999999999");
    }); 
  } 

  cerrar() {
    this.dialogRef.close();
  }

  pasar(camion: Camion) {
    this.dialogRef.close(camion);
  }

  
  
  list(buscar: any) {
    this.spinner.show();
    if(buscar) {
    this.camionService.getCamion(buscar).subscribe( result => {
      this.camion = result;
      this.spinner.hide();
    }, err => {this.spinner.hide();});
  } else {
    this.camionService.getCamion("9999999999").subscribe( result => {
      this.camion = result;
      this.spinner.hide();
    }, err => {this.spinner.hide();});
  } 
    }

    
  update(datos: any) {
    let dialogRef = this.dialog.open(AddCamionComponent, { 
      width: '100%',
      height: '90%',
      data: { camion: datos } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      this.list("9999999999");
    });
  }

  delete(id: number) {
    Swal.fire({
      title: "Quieres eliminar camion?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, bórralo!"
    }).then((result) => {
        if (result.isConfirmed) {
          this.camionService.deleteCamion(id).subscribe(res => {
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
              footer: '<a href="#">El camion en uso ya no se puede eliminar?</a>'
            });
          });
        }
      });
    
  }
}
