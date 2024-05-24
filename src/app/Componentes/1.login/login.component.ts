import { Component, OnInit } from '@angular/core';
import { ServicioPersonaService } from '../../Servicios/servicio-persona.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AutService } from 'src/app/Servicios/aut.service';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';
import { ServicioCarnetService } from 'src/app/Servicios/servicio-carnet.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { Usuario } from 'src/app/Clases/Usuario';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioExiste: boolean;
  nombreUsuario: string;
  contrasena: string;
  advertenciaUser: string = '';
  advertenciaCont: string = '';
  usuario: Usuario = new Usuario();

  login = {
    username: '',
    password: ''
  }

  fadeOut: boolean = false;
  constructor(private autService: AutService,
    private router: Router,
    private usuarioService: UsuarioService) {

  }
  ngOnInit(): void {
    this.usuarioService.verificarUsuarios().subscribe(
      (resultado: boolean) => {
        this.usuarioExiste = resultado;

      },
      (error) => {
        console.error("Error al verificar usuarios:", error);
      }
    );
  }
  public enviarCredenciales() {

    if (!this.nombreUsuario || !this.contrasena) {


      if (!this.nombreUsuario) {
        this.advertenciaUser = "Valor vacío, escriba su usuario.";
        setTimeout(() => {
          this.advertenciaUser = '';
        }, 900);
      } else if (!this.contrasena) {
        this.advertenciaCont = "Valor vacío, escriba su contraseña.";
        setTimeout(() => {
          this.advertenciaCont = '';
        }, 900);
      }
    } else {
      this.login.username = this.nombreUsuario;
      this.login.password = this.contrasena;
      this.autService.logearse(this.login).subscribe(
        (respuesta: any) => {

          this.autService.guardarToken(respuesta);
          this.fadeOut = true;
          // this.autService.obtenerUsuarioAutenticado().subscribe(
          //   (usuario: any) => {
          //     this.autService.guardarUsuario(usuario);
          setTimeout(() => {
            // Aplicar la clase fade-out para iniciar la animación
            this.fadeOut = true;

            // Navegar a la ruta deseada después de la animación
            setTimeout(() => {
              this.router.navigate(['/municipal']);
            }, 500); // Ajusta el tiempo de acuerdo a la duración de la animación
          }, 0);
          //   }

          // )


        },
        (error) => {
          this.advertenciaUser = "Credenciales incorrectas";
          setTimeout(() => this.advertenciaUser = "", 900);



          if (error instanceof HttpErrorResponse) {
            console.log("Cuerpo de la respuesta:", error.error);
          }


        }
      );

    }
  }
  public enviarNuevoUsuario(usuario: Usuario) {
    this.usuarioService.enviarNuevoUsuario(this.usuario).subscribe(
      (msje: string) => {
        Swal.fire("", msje, "success").then(
          (opcion) => {
            if (opcion.isConfirmed || opcion.isDismissed) {
              window.location.reload();
            }
          }
        )
      }
    )

  }
  public existeUsuario(): boolean {



    return true;
  };



}
