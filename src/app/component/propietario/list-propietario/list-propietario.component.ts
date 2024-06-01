import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Propietario } from 'src/app/model/propietario';
import { AddPropietarioComponent } from '../add-propietario/add-propietario.component';
import { PropietarioService } from 'src/app/service/propietario.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-propietario',
  templateUrl: './list-propietario.component.html',
  styleUrls: ['./list-propietario.component.css']
})
export class ListPropietarioComponent {

  public buscar = "";
  propietario: Propietario[] | undefined;
  public estadoPermiso = 0;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddPropietarioComponent>,
    private propietarioService: PropietarioService,
    private spinner: NgxSpinnerService) {
      this.estadoPermiso = parseInt(""+sessionStorage.getItem("estado"));
    } 

    ngOnInit() {
      this.list("9999999999");

     }

  openDialogNuevo(): void { 
    let dialogRef = this.dialog.open(AddPropietarioComponent, { 
      width: '70%',
      height: '80%',
      data: { } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      this.list("9999999999");
    }); 
  } 

  update(datos: any) {
    let dialogRef = this.dialog.open(AddPropietarioComponent, { 
      width: '70%',
      height: '80%',
      data: { propietario: datos } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      this.list("9999999999");
    });
  }

  cerrar() {
    this.dialogRef.close();
  }

  pasar(propietario: Propietario) {
    this.dialogRef.close(propietario);
  }

  
  list(buscar: any) {
    this.spinner.show();
    if(buscar) {
    this.propietarioService.getPropietario(buscar).subscribe( result => {
      this.propietario = result;
      this.spinner.hide();
    }, err => { this.spinner.hide();});
  } else {
    this.propietarioService.getPropietario("9999999999").subscribe( result => {
      this.propietario = result;
      this.spinner.hide();
    }, err => {this.spinner.hide();});
  } 
    }

  delete(id: number) {
    Swal.fire({
      title: "Quieres eliminar propietario?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, bórralo!"
    }).then((result) => {
        if (result.isConfirmed) {
          this.propietarioService.deletePropietario(id).subscribe(res => {
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
              footer: '<a href="#">El propietario en uso ya no se puede eliminar?</a>'
            });
          });
        }
      });
    
  }

}
