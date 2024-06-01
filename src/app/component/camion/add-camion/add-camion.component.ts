import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ListChoferComponent } from '../../chofer/list-chofer/list-chofer.component';
import { ListPropietarioComponent } from '../../propietario/list-propietario/list-propietario.component';
import { Camion } from 'src/app/model/camion';
import { ListMarcaComponent } from '../../marca/list-marca/list-marca.component';
import { CamionService } from 'src/app/service/camion.service';
import Swal from 'sweetalert2';
import { Chofer } from 'src/app/model/chofer';
import { Propietario } from 'src/app/model/propietario';
import { Marca } from 'src/app/model/marca';

@Component({
  selector: 'app-add-camion',
  templateUrl: './add-camion.component.html',
  styleUrls: ['./add-camion.component.css']
})
export class AddCamionComponent {

  public camion = new Camion();
  public button = "";
  public chofer = new Chofer();
  public propietario = new Propietario();
  public marca = new Marca();
  public marcaCarreta = new Marca();

  constructor(
    public dialogRef: MatDialogRef<AddCamionComponent>,
    public dialog: MatDialog,
    private camionService: CamionService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.camion.id = 0;
      if(data.camion) {
       this.button = "MODIFICAR";
       this.camion.id = this.data.camion.id;
       this.camion.tipocamion = this.data.camion.tipocamion;
       this.camion.tipocarroseria = this.data.camion.tipocarroseria;
       this.camion.tracto = this.data.camion.tracto;
       this.camion.anno = this.data.camion.anno;
       this.camion.ejes = this.data.camion.ejes;
       this.camion.carreta = this.data.camion.carreta;
       this.camion.color = this.data.camion.color;
       this.camion.tara = this.data.camion.tara;
       this.camion.modelo = this.data.camion.modelo;
       this.camion.chassis = this.data.camion.chassis;
       this.camion.cantidad = this.data.camion.cantidad;
       this.camion.tipo = this.data.camion.tipo;
       this.camion.id_marca = this.data.camion.id_marca;
       this.camion.id_marcacarreta = this.data.camion.id_marcacarreta;
       this.camion.id_chofer = this.data.camion.id_chofer;
       this.camion.id_propietario = this.data.camion.id_propietario;
       this.getChoferAndPropietario(this.camion.id_chofer, this.camion.id_propietario, this.camion.id_marca, this.camion.id_marcacarreta);
      } else {
        this.button = "REGISTRAR";
        this.camion.tipocamion = "Camion";
        this.camion.tipocarroseria = "Carreta";
      }

    }

  cerrar() {
    this.dialogRef.close();
  }

  getChoferAndPropietario(idChofer: any, idPropietario: any, idMarca: any, idMarcaCarreta: any) {
    this
    this.camionService.getChoferId(idChofer).subscribe( res => {
      if(res.apellido) {
        this.camion.chofer.nombre = res.nombre + " " + res.apellido;
      } else {
        this.camion.chofer.nombre = res.nombre;
      }
      
    });

    this.camionService.getPropietarioId(idPropietario).subscribe( res => {
      if(res.apellido) {
        this.camion.propietario.nombre = res.nombre + " " + res.apellido;
      } else {
        this.camion.propietario.nombre = res.nombre;
      }
    });

    this.camionService.getMarcaId(idMarca).subscribe( res => {
      this.camion.marca.descripcion = res.descripcion;
    });

    this.camionService.getMarcaId(idMarcaCarreta).subscribe( res => {
      this.camion.marcacarreta.descripcion = res.descripcion;
    });
  }

  openDialogChofer(): void { 
    let dialogRef = this.dialog.open(ListChoferComponent, { 
      width: '70%',
      height: '80%',
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      if(result) {
        this.camion.id_chofer = result.id;
        this.camion.chofer.nombre = result.nombre;
        if(result.apellido) {
          this.camion.chofer.nombre = result.nombre + ' ' +result.apellido;
        }
      }
    }); 
  }
  
  openDialogPropietario(): void { 
    let dialogRef = this.dialog.open(ListPropietarioComponent, { 
      width: '70%',
      height: '80%',
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      if(result) {
        if(result) {
          this.camion.id_propietario = result.id;
          this.camion.propietario.nombre = result.nombre;
          if(result.apellido) {
            this.camion.propietario.nombre = result.nombre + ' ' +result.apellido;
          }
        }
      }
    }); 
  }
  
  openDialogMarca(tipo: number): void { 
    let dialogRef = this.dialog.open(ListMarcaComponent, { 
      width: '70%',
      height: '80%',
      data: { tipo: tipo } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      if(result) {
        if(result.tipo == 1) {
          this.camion.id_marca = result.marca.id;
          this.camion.marca.descripcion = result.marca.descripcion;

        } else if(result.tipo == 2) {
          this.camion.id_marcacarreta = result.marca.id;
          this.camion.marcacarreta.descripcion = result.marca.descripcion;
        }
      }
    }); 
  }

  validarCampo(): boolean {
    const campos = [
        { campo: this.camion.id_marca, mensaje: "Debe elegir una marca!" },
        { campo: this.camion.id_marcacarreta, mensaje: "Debe elegir una marca!" },
        { campo: this.camion.id_chofer, mensaje: "Debe elegir un chofer!" },
        { campo: this.camion.id_propietario, mensaje: "Debe elegir el propietario!" },
    ];

    for (const item of campos) {
        if (!item.campo) {
            this.alertaSuccess(item.mensaje, "warning");
            return true;
        }
    }
    return false;
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
  
  save() {
    if(!this.validarCampo()) {
      if(this.camion.id == 0) {
        this.camionService.save(this.camion).subscribe( res => {
          this.cerrar();
          this.alertaSuccess(res.message, "success");
        }, err => {
          this.alertaSuccess(err.error.message, "warning");
        });
    } else {
        this.camionService.update(this.camion).subscribe( res => {
          this.cerrar();
          this.alertaSuccess(res.message, "success");
        }, err => {
          this.alertaSuccess(err.error.message, "warning");
        });
    }
    }
  }
  
}
