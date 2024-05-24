import { Component, createNgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { Carnet } from 'src/app/Clases/Carnet';
import { Ficha } from 'src/app/Clases/Ficha';
import { Persona } from 'src/app/Clases/Persona';
import { ExcelService } from 'src/app/Servicios/excel.service';
import { ServicioCarnetService } from 'src/app/Servicios/servicio-carnet.service';
import { ServicioPersonaService } from 'src/app/Servicios/servicio-persona.service';

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.component.html',
  styleUrls: ['./exportar.component.css']
})
export class ExportarComponent {

  constructor(private excelService: ExcelService,
     private servicioPersonaService: ServicioPersonaService,
     
     private servicioCarnetService:ServicioCarnetService) { }

  public exportarSegun() {

    var personas = document.getElementById('personas');
    var fichas = document.getElementById('fichas');
    var carnets = document.getElementById('carnets');

    var checks = [personas, fichas, carnets];
    for (var check of checks) {
      if (check instanceof HTMLInputElement) {


        if (check.checked) {
          if (check.getAttribute('data-name') == "personas") {

            try {
              this.servicioPersonaService.obtenerListaPersonas().subscribe(
                (listaPersonas: Persona[]) => {
                  if (listaPersonas.length > 0) {
                    this.excelService.exportarExcel(listaPersonas, 'personas');
                  } else {
                    console.log('No hay datos para exportar.');
                  }
                },
              );
            } catch (error) {
              console.error('Error al exportar a Excel:', error);
            }

          } else if (check.getAttribute('data-name') == "fichas") {

            try {
              this.servicioPersonaService.obtenerListaFichas().subscribe(
                (listaFichas: Ficha[]) => {
                  if (listaFichas.length > 0) {
                    this.excelService.exportarExcel(listaFichas, 'Fichas');
                  } else {
                    console.log('No hay datos para exportar.');
                  }
                },
              );
            } catch (error) {
              console.error('Error al exportar a Excel:', error);
            }

          } else if (check.getAttribute('data-name') == "carnets") {

            try {
              this.servicioCarnetService.obtenerListaCarnet().subscribe(
                (listaCarnets: Carnet[]) => {
                  if (listaCarnets.length > 0) {
                    this.excelService.exportarExcel(listaCarnets, 'carnets');
                  } else {
                    console.log('No hay datos para exportar.');
                  }
                },
              );
            } catch (error) {
              console.error('Error al exportar a Excel:', error);
            }

          }

        }
      }
    }
  }
}
