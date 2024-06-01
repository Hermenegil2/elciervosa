import { Chofer } from "./chofer";
import { Marca } from "./marca";
import { Propietario } from "./propietario";

export class Camion {
    id!: number;
    tipocamion!: string;
    tipocarroseria!: string;
    tracto!: string;
    anno!: number;
    ejes!: number;
    id_marca!: number;
    marca = new Marca();
    color!: string;
    tara!: string;
    modelo!: string;
    chassis!: string;
    carreta!: string;
    id_marcacarreta!: number;
    marcacarreta = new Marca();
    tipo!: string;
    cantidad!: number;
    id_chofer!: number;
    chofer = new Chofer();
    id_propietario!: number;
    propietario = new Propietario();
}