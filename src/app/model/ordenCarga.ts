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
}