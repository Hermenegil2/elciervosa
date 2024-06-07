import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Chofer } from 'src/app/model/chofer';
import { AddChoferComponent } from '../add-chofer/add-chofer.component';
import { ChoferService } from 'src/app/service/chofer.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-chofer',
  templateUrl: './list-chofer.component.html',
  styleUrls: ['./list-chofer.component.css']
})
export class ListChoferComponent {

  public buscar = "";
  chofer: Chofer[] | undefined;
  public estadoPermiso = 0;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddChoferComponent>,
    private choferService: ChoferService,
    private spinner: NgxSpinnerService) {
      this.estadoPermiso = parseInt(""+sessionStorage.getItem("estado"));
    } 

    ngOnInit() {
      this.list("9999999999");

     }

  openDialogNuevo(): void { 
    let dialogRef = this.dialog.open(AddChoferComponent, { 
      width: '70%',
      height: '80%',
      data: { } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      this.list("9999999999");
    }); 
  } 

  update(datos: any) {
    let dialogRef = this.dialog.open(AddChoferComponent, { 
      width: '70%',
      height: '80%',
      data: { chofer: datos } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      this.list("9999999999");
    });
  }

  cerrar() {
    this.dialogRef.close();
  }

  pasar(chofer: Chofer) {
    this.dialogRef.close(chofer);
  }

  
  list(buscar: any) {
    this.spinner.show();
    if(buscar) {
    this.choferService.getChofer(buscar).subscribe( result => {
      this.chofer = result;
      this.spinner.hide();
    }, err => {this.spinner.hide();});
  } else {
    this.choferService.getChofer("9999999999").subscribe( result => {
      this.chofer = result;
      this.spinner.hide();
    }, err => {this.spinner.hide();});
  } 
    }

  delete(id: number) {
    Swal.fire({
      title: "Quieres eliminar chofer?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, bórralo!"
    }).then((result) => {
        if (result.isConfirmed) {
          this.choferService.deleteChofer(id).subscribe(res => {
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
              footer: '<a href="#">El chofer en uso ya no se puede eliminar?</a>'
            });
          });
        }
      });
  }

  getEstadoText(estado: boolean): string {
    console.log(estado)
    return estado ? 'ACTIVO' : 'SUSPENDIDO';
  }
}
