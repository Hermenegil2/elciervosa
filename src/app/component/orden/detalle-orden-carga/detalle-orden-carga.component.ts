import { Component, Inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import html2canvas from 'html2canvas';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { OrdencargaService } from 'src/app/service/ordencarga.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-detalle-orden-carga',
  templateUrl: './detalle-orden-carga.component.html',
  styleUrls: ['./detalle-orden-carga.component.css']
})
export class DetalleOrdenCargaComponent {

  public cantidadFormato!: string;

  ordenCarga: any;

  url ="www.elciervosa.com.py";
  profile = '';
  elementType = NgxQrcodeElementTypes.URL;
  errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = this.url + this.profile;

  constructor(
    private ordenCargaService: OrdencargaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService
  ) {
    this.ordenCarga = {};
    if(data) {
      this.getOrdenId(data.id);
    }
  }

  public downloadPNG(fecha: Date, nroorden: string): void {
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
      link.download = fecha +"-"+nroorden+'-elciervosa.png';
  
      // Añadir el enlace al documento, hacer clic en él, y luego eliminarlo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  public downloadPDF(): void {

    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    }

    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');

      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(
        img, 'PNG', 
        bufferX, 
        bufferY, 
        pdfWidth, 
        pdfHeight, 
        undefined, 
        'FAST'
      );
      const nombre =  this.ordenCarga.fecha +"-"+this.ordenCarga.nroorden+'-elciervosa.png';
      doc.save(nombre);
    })
  }

  formatNumberWithUnit(amount: number, unit: string): string {
    const formattedNumber = new Intl.NumberFormat('es-ES').format(amount);
    return `${formattedNumber} ${unit}`;
  }

  async getOrdenId(id: number) {
    this.spinner.show();
    try {
      this.ordenCarga = await this.ordenCargaService.getOrdenCargaIdReport(id).pipe(
        catchError(error => {
          console.error('Error al obtener la orden de carga', error);
          this.spinner.hide();
          return of(null);
        })
      ).toPromise();

      if (this.ordenCarga) {
        this.spinner.hide();
        this.cantidadFormato = this.formatNumberWithUnit(this.ordenCarga.cantidad, 'KG');
          
      }
    } catch (error) {
      console.error('Error inesperado', error);
    }
  }

  getReport() {
    this.downloadPNG(this.ordenCarga.fecha, this.ordenCarga.nroorden);
  }
}
