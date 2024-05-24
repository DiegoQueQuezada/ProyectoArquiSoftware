import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../Clases/Usuario';
import {puerto,ip,url}from '../Direccion/Maquina';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  urlControlador=`${url}/usuario`;
  
  enviarNuevoUsuario(usuario: Usuario): Observable<string> {
    const httpOptions = {
      responseType: 'text' as 'json', // Indicamos que esperamos una respuesta de tipo texto
    };
    return this.httpClient.post<string>(`${this.urlControlador}/guardarUsuario`,usuario,httpOptions);
  }

  constructor(private httpClient:HttpClient) { }

  

  public verificarUsuarios(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.urlControlador}/estaVacia`);
  }
}
