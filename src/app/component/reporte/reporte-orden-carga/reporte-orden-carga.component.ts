import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { OrdencargaService } from 'src/app/service/ordencarga.service';
import { ListClienteComponent } from '../../cliente/list-cliente/list-cliente.component';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-orden-carga',
  templateUrl: './reporte-orden-carga.component.html',
  styleUrls: ['./reporte-orden-carga.component.css']
})
export class ReporteOrdenCargaComponent implements OnInit {

  cliente: Cliente[] | undefined;
  selectedClientId: number | null = null;
  public ordenCarga: any;
  public datos = { fechaI: '', fechaF: '', cliente: '', idCliente: 0 }
  public buscarCliente = "";
  selectedOption: any;
  clienteReporte = { nombrec: '', rucc: '' }
  fecha = new Date();
  public cantidadOrden = 0;

  constructor(
    private spinner: NgxSpinnerService,
    private clienteService: ClienteService,
    public dialog: MatDialog,
    private ordenCargaService: OrdencargaService) {}


  ngOnInit() {
    this.list("9999999999");
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

  listarReporte() {
    if(this.datos.idCliente == 0) {
      this.alertaSuccess("Debe elegir un cliente", "warning")
    } else {
    this.spinner.show();
    this.ordenCargaService.getOrdenCargaReportFechaIFechaF(this.datos.fechaI, this.datos.fechaF, this.datos.idCliente).subscribe(res => {
      this.ordenCarga = res;
      this.cantidadOrden = this.ordenCarga.length;
      this.spinner.hide();
    }, err => { this.spinner.hide();});
  }
  }

  openDialogCliente(): void { 
    let dialogRef = this.dialog.open(ListClienteComponent, { 
      width: '70%',
      height: '80%'
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
        if(result) {
          this.datos.idCliente = result.id;
          this.datos.cliente = result.nombre;
          this.clienteReporte.nombrec = result.nombre;
          this.clienteReporte.rucc = result.ruc;
          if(result.apellido) {
            this.datos.cliente = result.nombre + ' ' +result.apellido;
            this.clienteReporte.nombrec = result.nombre + ' ' +result.apellido;
          }
        }
    }); 
  } 
  public downloadPDF(): void {
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 2
    };

    html2canvas(DATA, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 0.75);

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Agregar la imagen a cada página sin márgenes
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        if (heightLeft > 0) {
          doc.addPage();
        }
      }

      const nombre = this.formatDate(this.fecha) + "-elciervosa.pdf";
      doc.save(nombre);
    });
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
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

  formatNumber(value: number): string {
    return new Intl.NumberFormat('es-ES', { minimumFractionDigits: 0 }).format(value) + ' KG';
  }

}
