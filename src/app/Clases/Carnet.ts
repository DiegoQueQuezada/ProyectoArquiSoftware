import { Persona } from "./Persona";

export class Carnet {

    //A DESEREALIZAR
    idCarnet: number;
    numeroCarnet: number;
    fechaRegistro: Date;
    fechaEmision: Date;
    fechaCaducidad: Date;
    estado: string;

    // AUXILIARES
    emitido:boolean=false;
    persona: Persona = new Persona();
    dias: string;
    idFicha: number;

}