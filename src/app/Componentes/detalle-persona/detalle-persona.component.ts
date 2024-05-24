import { Component, OnInit } from '@angular/core';
import { ServicioPersonaService } from '../../Servicios/servicio-persona.service';
import { ActivatedRoute } from '@angular/router';
import { Persona } from '../../Clases/Persona';
import { Ficha } from '../../Clases/Ficha';
import { ServicioCarnetService } from 'src/app/Servicios/servicio-carnet.service';
import { FichaService } from 'src/app/Servicios/ficha.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-detalle-persona',
  templateUrl: './detalle-persona.component.html',
  styleUrls: ['./detalle-persona.component.css']
})
export class DetallePersonaComponent implements OnInit {


  id: number;
  imagenUrl: any;
  fichas: Ficha[];
  persona: Persona = new Persona();
  ficha: Ficha=new Ficha();


  constructor(
    private servicioPersona: ServicioPersonaService,
    private activatedRoute: ActivatedRoute,
    private servicioCarnetService: ServicioCarnetService,
    private fichaService: FichaService,
    private domSanitizerv: DomSanitizer) { };

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.servicioPersona.obtenerPersonaPorId(this.id).subscribe(
      (persona) => {
        this.persona = persona;
      },
      (error) => {
        alert("Error al obtener a la persona");
      }
    )

    this.servicioPersona.obtenerListaFichasPorId(this.id).subscribe(

      (fichas) => {
        this.fichas = fichas;
      },
      (error) => {
        alert("Error al obtener las fichas");
      }
    )

  }

  public abrirArchivo(idFicha: string) {
    var contImg = document.getElementById("contImg");
    contImg!.style.display = "block";
    var idFicha2=parseInt(idFicha);
    this.servicioCarnetService.obtenerFichaPorNumero(idFicha2).subscribe(
      (ficha) => {
        this.ficha = ficha;
        this.fichaService.cargarArchivo(ficha.urlFicha).subscribe(
          (data) => {
            const blob = new Blob([data]);
            this.imagenUrl = this.domSanitizerv.bypassSecurityTrustUrl(URL.createObjectURL(blob));
          },
          (error) => {
            alert("Sucedio un error al cargar la imagen");
          }
        )

      })
  }

  public cerrarArchivo() {
    var contImg = document.getElementById("contImg");
    contImg!.style.display = "none";
  }
}
