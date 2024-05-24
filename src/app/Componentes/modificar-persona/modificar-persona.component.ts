import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Persona } from 'src/app/Clases/Persona';
import { ServicioPersonaService } from 'src/app/Servicios/servicio-persona.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modificar-persona',
  templateUrl: './modificar-persona.component.html',
  styleUrls: ['./modificar-persona.component.css']
})
export class ModificarPersonaComponent implements OnInit {

  constructor(private router: Router, private servicioPersonaService: ServicioPersonaService, private activatedRoute: ActivatedRoute) { }

  id: number;
  persona: Persona;
  dniExistente: boolean;

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.servicioPersonaService.obtenerPersonaPorId(this.id).subscribe(
      (persona) => {
        this.persona = persona;
      },
      (error) => {
        console.log("Hubo un error al obtener la persona");
      }
      )
      
    }
    public modificarPersona() {
      console.log(this.persona);
      this.servicioPersonaService.modificarPersona(this.persona).subscribe(
        (msje)=>{
          console.log(msje);
          Swal.fire("Hecho",msje as string,"success").then(
            (opcion)=>{
              if(opcion.isConfirmed){
                this.router.navigate(["/lista"]);
              }
            }
          )
          
        
      },
      (error)=>{

      }
    )
  }
  public cancelar() {
    console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaA");
    this.router.navigate(["/lista"]);
  }
}
