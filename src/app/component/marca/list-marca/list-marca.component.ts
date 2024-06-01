import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Marca } from 'src/app/model/marca';
import { AddMarcaComponent } from '../add-marca/add-marca.component';
import { MarcaService } from 'src/app/service/marca.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-marca',
  templateUrl: './list-marca.component.html',
  styleUrls: ['./list-marca.component.css']
})
export class ListMarcaComponent {

  public buscar = "";
  marca: Marca[] | undefined;
  public estadoPermiso = 0;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddMarcaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private marcaService: MarcaService,
    private spinner: NgxSpinnerService) {
      this.estadoPermiso = parseInt(""+sessionStorage.getItem("estado"));
    } 

    
    ngOnInit() {
      this.list("9999999999");

   }

  openDialogNuevo(): void { 
    let dialogRef = this.dialog.open(AddMarcaComponent, { 
      width: '50%',
      height: '50%',
      data: { } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      this.list("9999999999");
    }); 
  } 

  update(datos: any) {
    let dialogRef = this.dialog.open(AddMarcaComponent, { 
      width: '50%',
      height: '50%',
      data: { marca: datos } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      this.list("9999999999");
    });
  }

  cerrar() {
    this.dialogRef.close();
  }

  pasar(marca: Marca) {
    this.dialogRef.close({marca: marca, tipo: this.data.tipo});
  }

  
  list(buscar: any) {
    this.spinner.show();
    if(buscar) {
    this.marcaService.getMarca(buscar).subscribe( result => {
      this.marca = result;
      this.spinner.hide();
    }, err => {  this.spinner.hide();});
  } else {
    this.marcaService.getMarca("9999999999").subscribe( result => {
      this.marca = result;
      this.spinner.hide();
    }, err => {  this.spinner.hide();});
  } 
    }

  delete(id: number) {
    Swal.fire({
      title: "Quieres eliminar marca?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, bórralo!"
    }).then((result) => {
        if (result.isConfirmed) {
          this.marcaService.deleteMarca(id).subscribe(res => {
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
              footer: '<a href="#">La marca en uso ya no se puede eliminar?</a>'
            });
          });
        }
      });
    
  }
}
