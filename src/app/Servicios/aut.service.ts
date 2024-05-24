import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {puerto,ip,url}from '../Direccion/Maquina';

@Injectable({
  providedIn: 'root'
})
export class AutService {
  backAut: string = `${url}/aut`;
  
  constructor(private httpClient: HttpClient) { }
  public logearse(login: any): Observable<string> {
    const httpOptions = { responseType: 'text' as 'json' };
    return this.httpClient.post<string>(`${this.backAut}/generarToken`, login, httpOptions);
  }
  public guardarToken(token: any) {
    localStorage.setItem('token', token);
  }
  public obtenerToken() {
    return localStorage.getItem('token');
  }
  public seInicioSesion() {
    let token = localStorage.getItem('token');
    if (token == undefined || token == '' || token == null) {
      return false;
    } else {
      return true;
    }
  }
  public cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }
  public guardarUsuario(usuario: any) {
    localStorage.setItem('user', JSON.stringify(usuario));
  }
  public obtenerUsuarioAutenticado() {
    return this.httpClient.get(`${this.backAut}/actualUsuario`);
  }

}
