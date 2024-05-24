import { Component, OnInit } from '@angular/core';
import { Carnet } from '../../Clases/Carnet';
import { ServicioCarnetService } from '../../Servicios/servicio-carnet.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/Clases/Persona';

@Component({
  selector: 'app-lista-carnets',
  templateUrl: './lista-carnets.component.html',
  styleUrls: ['./lista-carnets.component.css']
})
export class ListaCarnetsComponent implements OnInit {

  filtro: string;
  carnetFiltrados: Carnet[];
  mostrarResultados: boolean = false;
  listaCarnet: Carnet[];
  carnets: Carnet[];
  opcionSeleccionada: string = 'opcion0';
  carnetEncontrado: Carnet;

  constructor(private servicioCarnetService: ServicioCarnetService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerListado(this.servicioCarnetService.obtenerListaCarnet());
  }

  public obtenerListado(observable: Observable<any>): void {
    
    observable.subscribe(
      (listaCarnet) => {
        this.listaCarnet = listaCarnet;
        this.carnets=listaCarnet;
        listaCarnet.forEach(
          (carnet: Carnet) => {
            if (carnet.estado == "Emitido") {
              carnet.emitido = true;
            } else {
              carnet.emitido = false;
            }

            this.servicioCarnetService.obtenerPersonaAsociadaPorNroCarnet(carnet.numeroCarnet).subscribe(
              (persona) => {
                carnet.persona = persona;
                const fRegistro = new Date(carnet.fechaRegistro);
                const fCaducidad = new Date(carnet.fechaCaducidad);
                let milisegundos = fCaducidad.getTime() - new Date().getTime();
                if (0 > milisegundos) {
                  milisegundos = 0;
                }
                let tiempo = milisegundos / (1000 * 60 * 60 * 24);
                carnet.dias = Math.round(tiempo).toString() + " dias";
                if (tiempo < 1) {
                  tiempo = milisegundos / (1000 * 60 * 60);
                  carnet.dias = Math.round(tiempo).toString() + " horas";
                }
              },
              (error) => {
                console.log("Ocurrio un error");
              }
            )
          }
        )



      },
      (error) => {
        console.log("Ocurrio un error al obtener la lista de carnets");

      }

    )

  }
  public ordenarPor(opcion: string) {
    if (opcion === "opcion0") {
      this.obtenerListado(this.servicioCarnetService.obtenerListaCarnet());
    } else if (opcion === "opcion1") {
      this.obtenerListado(this.servicioCarnetService.obtenerListaCarnetEstaSemana());
    } else if (opcion === "opcion2") {
      this.obtenerListado(this.servicioCarnetService.obtenerListaCarnetEsteMes());
    } else if (opcion === "opcion3") {
      this.obtenerListado(this.servicioCarnetService.obtenerListaCarnetEsteAño());
    } else if (opcion === "opcion4") {
      this.obtenerListado(this.servicioCarnetService.obtenerListaNombreAZ());
    } else if (opcion === "opcion5") {
      this.obtenerListado(this.servicioCarnetService.obtenerListaNombreZA());
    }
  }

  public emitirCarnet(carnet: Carnet) {
    this.servicioCarnetService.emitirCarnet(carnet).subscribe(
      (rpta) => {

        Swal.fire("Emitido", "con exito", "success").then(
          (resultado) => {
            if (resultado.isConfirmed) {
              carnet.emitido = true;
              window.location.reload();
            }
          }
        );
      },
      (error) => {
        console.log("Hubo un error al emitir el carnet");

      }
    );
  }
  public detallarPersona(idCarnet: number) {

    this.router.navigate([`/detalleCarnet/${idCarnet}`]);


  }
  public filtrarPersonas() {
    this.mostrarResultados = true;
    this.carnetFiltrados = this.carnets.filter(
      (carnet) => (
        carnet.persona.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
        carnet.persona.dni.includes(this.filtro)
      )
    );

  }
  public seleccionarPersona(carnet: Carnet) {
    this.carnetEncontrado = carnet;
    this.filtro = carnet.persona.nombre + carnet.persona.apellido + " - " + carnet.persona.dni;
    this.mostrarResultados = false;
  }
  public buscarRegistro() {
    if (this.carnetEncontrado) {
      const elemento = document.getElementById(this.carnetEncontrado.idCarnet.toString());
      if (elemento) {
        elemento.classList.add('pintar');
        elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }




}
