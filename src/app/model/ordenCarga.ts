import { Camion } from "./camion";
import { Carga } from "./carga";
import { Cliente } from "./cliente";
import { Direccion } from "./direccion";

export class OrdenCarga {
    id!: number;
    id_cliente!: number;
    cliente = new Cliente();
    id_carga!: number;
    carga = new Carga();
    id_direccionorigen!: number;
    direccionOrigen = new Direccion();
    id_direcciondestino!: number;
    direccionDestino = new Direccion();
    notas!: string;
    nroref!: string;
    id_camion!: number;
    camion = new Camion();
    fecha!: Date;
    nroorden!: number;
    id_user!: number;

    //
    nombrec!: string;
    rucc!: string;
    descripcionca!: string;
    descripciono!: string;
    descripciond!: string;
    tracto!: string;
    anno!: number;
    ejes!: number;
    carreta!: string;
    descripcionmarca!: string;
    color!: string;
    tara!: string;
    descripcionmarcacarreta!: string;
    modelo!: string;
    chassis!: string;
    cantidad!: number;
    tipo!: string;
    nombrechofer!: string;
    rucchofer!: string;
    telefonochofer!: string;
    nombrepropietario!: string;
    rucpropietario!: string;
    direccionpropietario!: string;
}