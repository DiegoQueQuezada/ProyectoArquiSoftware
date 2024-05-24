import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../Clases/Persona';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Ficha } from '../Clases/Ficha';
import {puerto,ip,url}from '../Direccion/Maquina';
@Injectable({
  providedIn: 'root'
})
export class ServicioPersonaService {
  
  urlControlador: string = `${url}/municipal`;
  urlAut: string = `${url}/aut`;
  urlGeneral: string = `${url}`;
  
  constructor(private httpClient: HttpClient) { }
  
  obtenerListaPersonas(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(`${this.urlControlador}/lista`);
  }
  obtenerListaFichas(): Observable<Ficha[]> {
    return this.httpClient.get<Ficha[]>(`${this.urlControlador}/listaFichas`);
  }
  obtenerListaPersonasApellido(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(`${this.urlControlador}/listaApellido`);
  }
  obtenerListaPersonasApellidoZA(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(`${this.urlControlador}/listaApellidoZA`);
  }
  obtenerListaPersonasNombre(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(`${this.urlControlador}/listaNombre`);
  }
  obtenerListaPersonasNombreZA(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(`${this.urlControlador}/listaNombreZA`);
  }
  obtenerListaFechaAsc(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(`${this.urlControlador}/listaFechaAsc`);
  }
  obtenerListaFechaDesc(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(`${this.urlControlador}/listaFechaDesc`);
  }

  obtenerPersonaPorId(id_persona: number): Observable<Persona> {

    return this.httpClient.get<Persona>(`${this.urlControlador}/empleado/${id_persona}`);
  }
  registrarPersona(p: Persona): Observable<Object> {

    return this.httpClient.post(`${this.urlControlador}/registrarPersona`, p);
  }
  modificarPersona(persona: Persona): Observable<string> {
    const httpOptions = {
      responseType: 'text' as 'json', // Indicamos que esperamos una respuesta de tipo texto
    };
    return this.httpClient.post<string>(`${this.urlControlador}/modificarPersona`, persona, httpOptions);
  }
  borrarPersona(id_persona: Number): Observable<String> {
    const httpOptions = {
      responseType: 'text' as 'json', // Indicamos que esperamos una respuesta de tipo texto
    };
    return this.httpClient.delete<String>(`${this.urlControlador}/borrarPersona/${id_persona}`, httpOptions);
  }

  obtenerListaFichasPorId(id: number): Observable<Ficha[]> {
    return this.httpClient.get<Ficha[]>(`${this.urlControlador}/obtenerFichasPorId/${id}`);
  }
  obtenerFicha(persona: Persona): Observable<Ficha> {
    return this.httpClient.post<Ficha>(`${this.urlControlador}/obtenerFicha`, persona);
  }
  public obtenerIdDeFicha(idPersona: number): Observable<number> {
    return this.httpClient.get<number>(`${this.urlControlador}/obtenerIdDeFicha/${idPersona}`);
  }
  public DesaprobarFicha(id: number, persona: Persona): Observable<Ficha> {
    console.log("Desaprobar listo");

    return this.httpClient.post<Ficha>(`${this.urlControlador}/desaprobarFicha/${id}`, persona);


  }

  registrarFicha(idPersona: number, f: Ficha): Observable<Ficha> {
    console.log("FICHA " + JSON.stringify(f));

    
    return this.httpClient.post<Ficha>(`${this.urlControlador}/registrarFicha/${idPersona}`, f);
  }
  obtenerEstadoFicha(id: number): Observable<Ficha> {
    return this.httpClient.post<Ficha>(`${this.urlControlador}/obtenerEstadoDeLaFicha`, id);
  }
  public registrarArchivoPorId(id: number, formData: FormData): Observable<string> {
    const httpOptions = {
      responseType: 'text' as 'json', // Indicamos que esperamos una respuesta de tipo texto
    };
    return this.httpClient.post<string>(`${this.urlControlador}/registrarArchivoPorId/${id}`, formData, httpOptions);
  }
  verificarDNI(dni: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.urlControlador}/verificarDNI?dni=${dni}`);
  }
  verificarFicha(nroFicha: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.urlControlador}/verificarFicha?nroFicha=${nroFicha}`);
  }
}
