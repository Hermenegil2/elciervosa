import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Camion } from 'src/app/model/camion';
import { CamionService } from 'src/app/service/camion.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reporte-camiones',
  templateUrl: './reporte-camiones.component.html',
  styleUrls: ['./reporte-camiones.component.css']
})
export class ReporteCamionesComponent implements OnInit {

  private estado = true;
  public cantidadOrden = 0;
  fecha = new Date();
  camionAll: any[] = [];
  items: any[] = [];
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  validarItem = 0;
  estadoValidar = false;

  public buscar = "";

  camion: Camion[] | undefined;

  constructor(
    private camionService: CamionService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat('es-ES', { minimumFractionDigits: 0 }).format(value) + ' KG';
  }

  pasar(datos: any) {
    
    const existe = this.camionAll.some((seleccionado) => seleccionado.id === datos.id);

    if (!existe) {
      if(this.estado) {
        this.estado = false;
      this.spinner.show();
      this.camionService.getIdCamionReporte(datos.id).subscribe(res => {
        this.estado = true;
        this.camionAll.push(res);
        this.spinner.hide();
      }, err => { 
        this.spinner.hide();
        this.estado = true;
      })
    }
  } else {
      this.alertaSuccess("Ya existe en la tabla!!", "warning");
    }
  
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

  delete(index: number) {
    this.camionAll.splice(index, 1);
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

    loadItems() {
      this.spinner.show();
      this.camionService.getCamionPag(this.currentPage, this.pageSize).subscribe(data => {
        this.spinner.hide();
        this.camion = data.items;
        this.totalItems = data.totalItems;
        this.totalPages = data.totalPages;
        this.validarItem = this.camion.length;
        if(this.validarItem >= 10) {
          this.estadoValidar = false;
        } else {
          this.estadoValidar = true;
        }
      }, err => {
        this.spinner.hide();
      });
    }
  
    goToPage(page: number) {
      this.currentPage = page;
      this.loadItems();
    }

    getAllReporte() {
      this.spinner.show();
      this.camionAll = [];
      this.camionService.getAllReporte().subscribe(res => {
        this.camionAll = res;
        setTimeout(() => {
         this.downloadPDF();
        this.spinner.hide();
        this.camionAll = [];
        }, 1000);
      }, err => {
        this.spinner.hide();
      })
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
}
