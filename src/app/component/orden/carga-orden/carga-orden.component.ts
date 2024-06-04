import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdenCarga } from 'src/app/model/ordenCarga';
import { ListClienteComponent } from '../../cliente/list-cliente/list-cliente.component';
import { ListCargaComponent } from '../../carga/list-carga/list-carga.component';
import { ListDireccionComponent } from '../../direccion/list-direccion/list-direccion.component';
import { ListCamionComponent } from '../../camion/list-camion/list-camion.component';
import { Camion } from 'src/app/model/camion';
import { CamionService } from 'src/app/service/camion.service';
import { OrdencargaService } from 'src/app/service/ordencarga.service';
import { Chofer } from 'src/app/model/chofer';
import { Propietario } from 'src/app/model/propietario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { Marca } from 'src/app/model/marca';

@Component({
  selector: 'app-carga-orden',
  templateUrl: './carga-orden.component.html',
  styleUrls: ['./carga-orden.component.css']
})
export class CargaOrdenComponent {

  public cantidadFormato!: string;

  private estado = false;
  private min!: number;
  private max!: number;
  private generatedNumbers!: Set<number>;

  url ="www.elciervosa.com.py";
  profile = '';
  elementType = NgxQrcodeElementTypes.URL;
  errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = this.url + this.profile;

  public ordenCarga = new OrdenCarga();
  public camion = new Camion();
  public chofer = new Chofer();
  public propietario = new Propietario();
  public marca = new Marca();
  public marcaCarreta = new Marca();
  private nroOrden: number;

  constructor(
    public dialog: MatDialog,
    private camionService: CamionService,
    private ordenCargaService: OrdencargaService,
    private router: Router) {
      this.min = 0;
      this.max = 999999999;
      this.generatedNumbers = new Set<number>();
      this.ordenCarga.nroorden = parseInt(""+this.generate());
      this.nroOrden = this.ordenCarga.nroorden;
      this.ordenCarga.fecha = new Date();
      console.log(this.ordenCarga.nroorden);
 
    } 

    formatNumberWithUnit(amount: number, unit: string): string {
      const formattedNumber = new Intl.NumberFormat('es-ES').format(amount);
      return `${formattedNumber} ${unit}`;
    }

    public downloadPNG(): void {
      const DATA: any = document.getElementById('htmlData');
      const options = {
        background: 'white',
        scale: 3
      };
    
      html2canvas(DATA, options).then((canvas) => {
        // Generar la imagen en formato PNG
        const img = canvas.toDataURL('image/png');
    
        // Crear un enlace temporal para iniciar la descarga
        const link = document.createElement('a');
        link.href = img;
        link.download = this.formatDate() +"-"+this.nroOrden+'-elciervosa.png';
    
        // Añadir el enlace al documento, hacer clic en él, y luego eliminarlo
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }

    formatDate(): string {
        let formattedDate: string = '';
        const date = new Date();
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        return formattedDate = `${day}-${month}-${year}`;
    }

  openDialogCliente(): void { 
    let dialogRef = this.dialog.open(ListClienteComponent, { 
      width: '70%',
      height: '80%'
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
        if(result) {
          this.ordenCarga.id_cliente = result.id;
          this.ordenCarga.nombrec = result.nombre;
          if(result.apellido) {
            this.ordenCarga.nombrec = result.nombre + ' ' +result.apellido;
          }
          this.ordenCarga.rucc = result.ruc;
        }
    }); 
  } 
  
  openDialogCarga(): void { 
    let dialogRef = this.dialog.open(ListCargaComponent, { 
      width: '70%',
      height: '80%',
      data: { } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
        if(result) {
          this.ordenCarga.id_carga = result.id;
          this.ordenCarga.descripcionca = result.descripcion;
        }
    }); 
  } 

  openDialogDireccion(tipo: number): void { 
    let dialogRef = this.dialog.open(ListDireccionComponent, { 
      width: '70%',
      height: '80%',
      data: { tipo: tipo } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      if(result) {
        if(result.tipo == 1) {
          this.ordenCarga.id_direccionorigen = result.direccion.id;
          this.ordenCarga.descripciono = result.direccion.descripcion;
        } else if(result.tipo == 2) {
          this.ordenCarga.id_direcciondestino = result.direccion.id;
          this.ordenCarga.descripciond = result.direccion.descripcion;
        }
      }
    }); 
  } 

  openDialogCamion(): void { 
    let dialogRef = this.dialog.open(ListCamionComponent, { 
      width: '70%',
      height: '80%',
      data: { } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
        if(result) {
          this.ordenCarga.anno = result.anno;
          this.ordenCarga.ejes = result.ejes;
          this.ordenCarga.carreta = result.carreta;
          this.ordenCarga.color = result.color;
          this.ordenCarga.tara = result.tara;
          this.ordenCarga.modelo = result.modelo;
          this.ordenCarga.chassis = result.chassis;
          this.ordenCarga.tipo = result.tipo;
          this.ordenCarga.tracto = result.tracto;
          this.ordenCarga.id_camion = result.id;
          this.ordenCarga.cantidad = result.cantidad;
          this.getChoferAndPropietario(result.id_chofer, result.id_propietario, result.id_marca, result.id_marcacarreta);
        }
    }); 
  } 

  validarCampo(): boolean {
    const campos = [
        { campo: this.ordenCarga.id_cliente, mensaje: "El cliente no debe quedar vacio!" },
        { campo: this.ordenCarga.id_carga, mensaje: "El tipo de carga no debe quedar vacio!" },
        { campo: this.ordenCarga.id_direccionorigen, mensaje: "El origen no debe quedar vacio!" },
        { campo: this.ordenCarga.id_direcciondestino, mensaje: "El destino no debe quedar vacio!" },
        { campo: this.ordenCarga.id_camion, mensaje: "El camion no debe quedar vacio!" }
    ];

    for (const item of campos) {
        if (!item.campo) {
            this.alertaSuccess(item.mensaje, "warning");
            return true;
        }
    }
    return false;
  }

  save() {
    if(!this.estado) {
      if(!this.validarCampo()) {
        this.estado = true;
        this.cantidadFormato = this.formatNumberWithUnit(this.ordenCarga.cantidad, 'KG');
        this.ordenCarga.id_user = parseInt(""+sessionStorage.getItem("codigo"));
        this.ordenCarga.nroorden = this.nroOrden;
        this.ordenCargaService.save(this.ordenCarga).subscribe( res => {
          const datos = res.message;
          this.downloadPNG();
          this.alertaSuccess(datos, "success")
          this.router.navigateByUrl('/list-orden-carga', { replaceUrl: true });
        }, err => {
          this.estado = false;
          this.alertaSuccess(err.error.message, "warning");
        })
    }
  }
  }

  getChoferAndPropietario(idChofer: any, idPropietario: any, idMarca: any, idMarcaCarreta: any) {
    this
    this.camionService.getChoferId(idChofer).subscribe( res => {
      this.chofer = res;
      if(!this.chofer.apellido) {
        this.ordenCarga.nombrechofer = this.chofer.nombre;
      } else {
        this.ordenCarga.nombrechofer = this.chofer.nombre + " " + this.chofer.apellido;
      }
      this.ordenCarga.rucchofer = this.chofer.ruc;
      this.ordenCarga.telefonochofer = this.chofer.telefono;
    });

    this.camionService.getPropietarioId(idPropietario).subscribe( res => {
      this.propietario = res;
      if(!this.propietario.apellido) {
        this.ordenCarga.nombrepropietario = this.propietario.nombre;
      } else {
        this.ordenCarga.nombrepropietario = this.propietario.nombre + " " + this.propietario.apellido;
      }
      this.ordenCarga.rucpropietario = this.propietario.ruc;
      this.ordenCarga.direccionpropietario = this.propietario.direccion;
    });

    this.camionService.getMarcaId(idMarca).subscribe( res => {
      this.marca = res;
      this.ordenCarga.descripcionmarca = this.marca.descripcion;
    });

    this.camionService.getMarcaId(idMarcaCarreta).subscribe( res => {
      this.marcaCarreta = res;
      this.ordenCarga.descripcionmarcacarreta = this.marcaCarreta.descripcion;
    });
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

  public generate(): number | null {
    if (this.generatedNumbers.size >= (this.max - this.min + 1)) {
        // Todos los números posibles han sido generados
        return null;
    }

    let randomNumber: number;
    do {
        randomNumber = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    } while (this.generatedNumbers.has(randomNumber));

    this.generatedNumbers.add(randomNumber);
    return randomNumber;
}

  
}
