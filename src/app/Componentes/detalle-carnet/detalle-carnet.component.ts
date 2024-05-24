import { Component, OnInit } from '@angular/core';
import { ServicioCarnetService } from '../../Servicios/servicio-carnet.service';
import { ActivatedRoute } from '@angular/router';
import { Carnet } from '../../Clases/Carnet';
import { Ficha } from '../../Clases/Ficha';
import { ServicioPersonaService } from '../../Servicios/servicio-persona.service';
import { FichaService } from 'src/app/Servicios/ficha.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-carnet',
  templateUrl: './detalle-carnet.component.html',
  styleUrls: ['./detalle-carnet.component.css']
})
export class DetalleCarnetComponent implements OnInit {

  idCarnet: number;
  carnet: Carnet = new Carnet();
  ficha: Ficha = new Ficha();
  imagenUrl: any;
  constructor(private domSanitizerv: DomSanitizer, private fichaService: FichaService, private ServicioCarnetService: ServicioCarnetService, private ActivatedRoute: ActivatedRoute, private ServicioPersonaService: ServicioPersonaService) { }


  ngOnInit(): void {
    this.idCarnet = this.ActivatedRoute.snapshot.params["id"];
    this.ServicioCarnetService.obtenerPersonaAsociada(this.idCarnet).subscribe(
      (persona) => {
        this.carnet.persona = persona;
      }
    )
    this.ServicioCarnetService.obtenerFicha(this.idCarnet).subscribe(
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
      },
      (error) => {
        console.log("Ocurrio un error al obtener la ficha");
      }
    );
  }
}
