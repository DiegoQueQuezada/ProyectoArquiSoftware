import { Component, OnInit } from '@angular/core';
import { Persona } from '../../Clases/Persona';
import { ServicioPersonaService } from '../../Servicios/servicio-persona.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-personas',
  templateUrl: './lista-personas.component.html',
  styleUrls: ['./lista-personas.component.css']
})
export class ListaPersonasComponent implements OnInit {

  // arrays=[]
  // int[] arrayss=new int[20];

  filtro: string = "";
  personasFiltradas: Persona[];
  mostrarResultados: boolean = false;
  personas: Persona[];
  opcionSeleccionada: string = 'opcion1';
  seBorroUnDato: boolean = false;
  personaEncontrada: Persona;
  porNombre: boolean = true;

  constructor(private servUsuario: ServicioPersonaService, private router: Router) { };



  ngOnInit(): void {
    this.obtenerListadoPersonas(this.servUsuario.obtenerListaPersonas());
  }

  public filtrarPersonas() {
    this.mostrarResultados = true;
    this.personasFiltradas = this.personas.filter(
      (persona) => (
        persona.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
        persona.dni.includes(this.filtro)
      )
    );

  }

  public obtenerListadoPersonas(lista: Observable<any>): void {
    lista.subscribe(
      (listado) => {
        listado.forEach(
          (persona: Persona) => {
            this.servUsuario.obtenerEstadoFicha(persona.id_persona).subscribe(
              (fichaRecibida) => {
                if (fichaRecibida == null) {
                  persona.estadoFichaActual = "Inexistente";
                  persona.dias = "Sin dias";
                } else {
                  persona.estadoFichaActual = fichaRecibida.estado;
                  if (persona.estadoFichaActual == "Aprobado" || persona.estadoFichaActual == "Desaprobado" || persona.estadoFichaActual == "Terminada") {
                    persona.dias = "Sin dias";
                  } else {
                    const fCaducidad = new Date(fichaRecibida.fechaCaducacion);
                    let milisegundos = fCaducidad.getTime() - new Date().getTime();
                    if (0 > milisegundos) {
                      milisegundos = 0;
                    }
                    const dias = milisegundos / (1000 * 60 * 60 * 24);
                    const diasRedondeados = Math.round(dias);
                    persona.dias = diasRedondeados.toString();
                  }
                }
              }
            );
          });
        this.personas = listado;
      },
      (error) => {
        console.log("Ocurrió un error al obtener la lista de personas.");
      }
    )
  }

  ordenarPor(opcion: string) {
    if (opcion === "opcion0") {
      this.obtenerListadoPersonas(this.servUsuario.obtenerListaPersonas());
    } else if (opcion === "opcion1") {
      this.obtenerListadoPersonas(this.servUsuario.obtenerListaFechaAsc());
    } else if (opcion === "opcion2") {
      this.obtenerListadoPersonas(this.servUsuario.obtenerListaFechaDesc());
    } else if (opcion === "opcion3") {
      this.obtenerListadoPersonas(this.servUsuario.obtenerListaPersonasNombre());
    } else if (opcion === "opcion4") {
      this.obtenerListadoPersonas(this.servUsuario.obtenerListaPersonasNombreZA());
    } else if (opcion === "opcion5") {
      this.obtenerListadoPersonas(this.servUsuario.obtenerListaPersonasApellido());
    } else if (opcion === "opcion6") {
      this.obtenerListadoPersonas(this.servUsuario.obtenerListaPersonasApellidoZA());
    }
  }
  eliminarPersona(id: number) {
    Swal.fire("", "Seguro que deseas eliminar esta persona tambien se borrara sus fichas y carnet?", "warning").then(
      (resultado) => {
        if (resultado.isConfirmed) {
          this.servUsuario.borrarPersona(id).subscribe(
            (msj) => {
              Swal.fire("Eliminado", msj as string, "success").then(
                (opcion) => { if (opcion.dismiss || opcion.isConfirmed) window.location.reload(); }
              )
            },
            (error) => { alert("Hubo un error al eliminar el usuario"); }
          );
        }
      }
    )

  }
  obtenerEstiloFondo(estado: String) {
    if (estado === 'Inexistente') {
      return { 'background-color': 'rgb(30,30,30,0.1)', 'color': 'grey', 'font-weight': '100' };
    } else if (estado === 'En revision') {
      return { 'background-color': 'rgb(0,255,0,0.1)', 'color': 'green', 'font-weight': '100' };
    } else if (estado === 'Desaprobado') {
      return { 'background-color': '#FF0303', 'color': 'white', 'font-weight': '100' };
    } else if (estado === 'Aprobado') {
      return { 'background-color': 'rgb(0,0,255,0.1)', 'color': '#0303FF', 'font-weight': '100' };
    } else {
      return { 'background-color': 'rgb(255,0,0,0.1)', 'color': 'red', 'font-weight': '100' };
    }
  }
  AgregarNuevaFicha(id: number) {

    this.router.navigate([`ficha/${id}`]);

  }
  detallarPersona(id: number) {

    this.router.navigate([`/detalle/${id}`]);
  }

  modificarPersona(id: number) {

    this.router.navigate([`/modificar/${id}`]);
  }
  public irVistaAprobacion(idPersona: number) {

    this.router.navigate([`/aprobacionFicha/${idPersona}`]);

  }
  public obtenerDiasRestantes(persona: Persona): String {
    var diasRestantes = 0;
    console.log(persona);

    if (!persona.fechaRegistro || persona.estadoFichaActual == "Aprobado" || persona.estadoFichaActual == "Desaprobado") {
      return "Sin dias";
    } else {
    }
    return persona.dias.toString();
  }
  public seleccionarPersona(persona: Persona) {
    this.personaEncontrada = persona;
    this.filtro = persona.nombre + persona.apellido + " - " + persona.dni;
    this.mostrarResultados = false;
  }
  public buscarRegistro() {
    if (this.personaEncontrada) {
      const elemento = document.getElementById(this.personaEncontrada.id_persona.toString());
      if (elemento) {
        elemento.classList.add('pintar');
        elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
