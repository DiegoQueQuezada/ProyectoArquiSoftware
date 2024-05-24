export class Ficha{
    //A DESEREALIZAR
    idFicha:number
    nroFicha:string;
    fechaInscripcion:Date;
    fechaCaducacion:Date;
    laboratorio:string;
    grupoSanguineo:string;           
    observaciones:string;
    estado:string;
    urlFicha:string;
    ano:number;
    fechaPago:Date;
    examenMedico:string
    charla:string

    //NECESARIO
    formData:FormData;
    
    constructor() {
        this.formData = new FormData();
      }
}