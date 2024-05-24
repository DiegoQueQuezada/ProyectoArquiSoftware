import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioPersonaService } from '../../Servicios/servicio-persona.service';
import { Persona } from '../../Clases/Persona';
import { Ficha } from '../../Clases/Ficha';
import Swal from 'sweetalert2';
import { FichaService } from '../../Servicios/ficha.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-ficha-persona',
  templateUrl: './ficha-persona.component.html',
  styleUrls: ['./ficha-persona.component.css']
})
export class FichaPersonaComponent implements OnInit {

  id: number;
  p: Persona = new Persona();
  f: Ficha = new Ficha();
  fechaEsAnterior: boolean = false;
  nroFichaRepetido: boolean;
  opcionSeleccionada: string;
  contenidoObservaciones:string;
  constructor(private fichaService: FichaService, private servPersona: ServicioPersonaService, private rutaActual: ActivatedRoute, private router: Router) { };

  ngOnInit(): void {
    this.id = this.rutaActual.snapshot.params['id'];
    this.servPersona.obtenerPersonaPorId(this.id).subscribe(
      (persona) => {
        this.p = persona;
      },
      (error) => {
        alert("No se obtuvo la persona");
      }
    )

  }
  cambiarOpObservacion(value: string) {
    if (this.opcionSeleccionada == "0"){
      this.f.observaciones="NO";
    }else{
      this.f.observaciones = this.contenidoObservaciones;
    }
  }
  validarFecha() {
    const fechaSeleccionada = new Date(this.f.fechaInscripcion);
    fechaSeleccionada.setMinutes(fechaSeleccionada.getMinutes() + 5);
    const fechaActual = new Date();
    if (fechaSeleccionada < fechaActual) {
      this.fechaEsAnterior = true;
    } else {
      this.fechaEsAnterior = false;
    }
  }

  public enviarFicha() {
    this.servPersona.registrarFicha(this.id, this.f).pipe(
      switchMap(
        () => {
          return new Promise<void>(
            (resolve) => {
              Swal.fire("Ficha", "Guardada", "success").then(
                (opcion) => {
                  if (opcion.isConfirmed || opcion.isDismissed) {
                    resolve();
                  }
                }
              );
            }
          )
        })
    ).subscribe(
      (ficha) => {
        this.router.navigate(["/lista"]);
      },
      (error) => {
        alert("Error al registrar la ficha");
      }
    )
  }
  public descargarArchivo(event: any) {

    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.servPersona.registrarArchivoPorId(this.id, formData).subscribe(
        (url) => {
          this.f.urlFicha = url;
        },
        (error) => {
          console.log("Error al registar el archivo");

        }
      )
    }
  }

  public verificarNroFicha(nroFicha: string) {

    var cadenaNroFicha = nroFicha.toString();
    console.log("nroFicha"+nroFicha);
    console.log("nroFicha subtring "+cadenaNroFicha.substring(0,5));
    if(cadenaNroFicha.length>6){
      this.f.nroFicha = cadenaNroFicha.substring(0, 5);
    }

    const numeroFicha: number = parseInt(nroFicha, 10);

    this.servPersona.verificarFicha(numeroFicha).subscribe(
      (booleano) => {
        this.nroFichaRepetido = booleano;
      },
      (error) => {
        console.log("Sucedio un error al verificar el nro de ficha");
      }
    )
  }


}
