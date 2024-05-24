import { NgLocaleLocalization } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ServicioPersonaService } from '../../Servicios/servicio-persona.service';
import { Persona } from '../../Clases/Persona';
import { Ficha } from '../../Clases/Ficha';
import { Carnet } from '../../Clases/Carnet';
import { ServicioCarnetService } from '../../Servicios/servicio-carnet.service';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FichaService } from 'src/app/Servicios/ficha.service';

@Component({
  selector: 'app-aprobacion-ficha',
  templateUrl: './aprobacion-ficha.component.html',
  styleUrls: ['./aprobacion-ficha.component.css']
})
export class AprobacionFichaComponent implements OnInit {

  id: number;
  persona: Persona = new Persona();
  carnet: Carnet = new Carnet();
  ficha: Ficha = new Ficha();
  url: string;
  imagenUrl: any;
  constructor(private fichaService: FichaService, private domSanitizer: DomSanitizer, private ServicioCarnetService: ServicioCarnetService, private activadtedRoute: ActivatedRoute, private servicioPersona: ServicioPersonaService, private router: Router) { }
  ngOnInit(): void {
    console.log("URL DE FICHA :" + this.ficha.urlFicha);
    this.id = this.activadtedRoute.snapshot.params['id'];
    this.obtenerDatosPersona(this.id);
    this.obtenerFichaActual(this.id);

  }





  public obtenerFichaActual(id: number) {
    this.servicioPersona.obtenerListaFichasPorId(id).subscribe(
      (lista) => {
        this.ficha = lista[lista.length - 1];
        this.ficha.urlFicha = lista[lista.length - 1].urlFicha;
        this.url = this.ficha.urlFicha;
        this.id = this.ficha.idFicha;
        console.log("FICHA RECIBIDAAAAAAAAAAA: " + JSON.stringify(this.ficha));

        this.fichaService.cargarArchivo(this.url).subscribe(
          (data) => {
            console.log("SE CONSIGUIO CORRECTAMENTE LA IMAGEN");


            const blob = new Blob([data]);
            this.imagenUrl = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
          },
          (error) => {
            alert("Sucedio un error al cargar la imagen");
          }

        )
      },
      (error) => {
        console.log("Error al conseguir la ficha");
      }
    )
  }
  public obtenerDatosPersona(id: number) {
    this.servicioPersona.obtenerPersonaPorId(id).subscribe(
      (persona) => {
        this.persona = persona;
      },
      (error) => {
        console.log("Error al obtener la persona");
      }
    );


  }
  public AprobarFicha() {

    this.carnet.fechaEmision = new Date();



    this.ServicioCarnetService.registrarCarnet(this.carnet, this.id).subscribe(

      (mensaje) => {


        Swal.fire("Carnet Creado", "Con exito", "success").then(
          (op) => {
            if (op.isConfirmed) {
              this.router.navigate([`/lista2`]);
            }
          }
        );

      },
      (error) => {
        alert("error al registrar el carnet ");
      }
    )




  }

  public DesaprobarFicha(id: number, persona: Persona) {
    this.servicioPersona.DesaprobarFicha(id, persona).subscribe(
      (ficha) => {

        this.ficha = ficha;

      },
      (error) => {
        console.log("Hubo un error al desaprobar la ficha.");

      }
    )

    this.router.navigate(["/lista"]);
  }




}
