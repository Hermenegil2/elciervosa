import { Component, OnInit } from '@angular/core';
import { differenceInYears } from 'date-fns';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

    public nroExperiencia = "";

  ngOnInit(): void {
    this.getExperiencia();
  }



  getExperiencia() {
    const fechaInicial = new Date('2014-05-20');
    const fechaActual = new Date();

    const diferenciaEnAnios = differenceInYears(fechaActual, fechaInicial);
    this.nroExperiencia = `${diferenciaEnAnios}`;

  }

}
