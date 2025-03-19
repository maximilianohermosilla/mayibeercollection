import { Pais } from "./pais"

export interface Ciudad {
    id?: number
    nombre: string
    idPais?: number
    pais?: Pais
    
    label?: string;
    value?: number;
}