import { Ciudad } from "./ciudad";
import { Estilo } from "./estilo";
import { Marca } from "./marca";

export interface Cerveza {
    id?: number;
    nombre: string;
    ibu?: number;
    alcohol?: number;
    idMarca?: number;
    marca?: Marca;
    idEstilo?: number;
    estilo?: Estilo;
    idCiudad?: number;
    ciudad?: Ciudad;
    idPais?: number;
    observaciones?: string;
    contenido?: number;    
    imagen?: string;

    label?: string;
    value?: number;
}