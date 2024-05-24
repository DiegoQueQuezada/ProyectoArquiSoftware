import { Component, OnInit } from '@angular/core';
import { Persona } from '../../Clases/Persona';
import { ServicioPersonaService } from '../../Servicios/servicio-persona.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Ficha } from '../../Clases/Ficha';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registro-persona',
  templateUrl: './registro-persona.component.html',
  styleUrls: ['./registro-persona.component.css'],
  providers: [DatePipe]
})
export class RegistroPersonaComponent implements OnInit {
  
  //Se enlanzan en html a traves de {{variable}}
  saludo: String = "hola"; 
  p: Persona = new Persona();
  fecha: Date = new Date();
  fechaTransformada = this.datePipe.transform(this.fecha, "EEEE dd 'de' MMMM 'del' YYYY")
  fechaFormateada = this.fechaTransformada!.charAt(0).toUpperCase() + this.fechaTransformada!.slice(1);
  dniExistente: boolean;

  ngOnInit(): void {

  }


  constructor(
    private router: Router,
    private personaServ: ServicioPersonaService,
    private datePipe: DatePipe) { };
    


  enviarDatos() {

    this.p.fechaRegistro = this.fecha;
    this.personaServ.registrarPersona(this.p).pipe(
      switchMap(
        () => {
          return new Promise<void>(
            (resolve) => {
              Swal.fire("Ingresado", "con exito", "success").then((result) => {
                if (result.isConfirmed) {
                  resolve();
                }
              });

            })
        }
      )
    ).subscribe(
      (persona) => {
        window.location.reload();
      },
      (error) => {
        alert("ocurrio un error inesperado");
      }

    );

  }

  public verificarDNI(dni: string) {
    this.personaServ.verificarDNI(dni).subscribe((result) => {
      this.dniExistente = result;
    });
  }



}
