import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carnet } from '../Clases/Carnet';
import { Observable } from 'rxjs';
import { Persona } from '../Clases/Persona';
import { Ficha } from '../Clases/Ficha';
import { puerto, ip, url } from '../Direccion/Maquina';

@Injectable({
  providedIn: 'root'
})
export class ServicioCarnetService {
  
  
  
  
  private URLBack: String = `${url}/municipal`;
  
  constructor(private httpClient: HttpClient) { }
  
  public registrarCarnet(carnet: Carnet, id: number) {
    const httpOptions = { responseType: 'text' as 'json', };
    
    return this.httpClient.post(`${this.URLBack}/registrarCarnet/${id}`, carnet, httpOptions);
  }
  
  obtenerListaFichas(): Observable<Ficha[]> {
    return this.httpClient.get<Ficha[]>(`${this.URLBack}/obtenerListaFichas`);
  }
  obtenerListaPersonas(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(`${this.URLBack}/obtenerListaPersonas`);
  }
  public obtenerListaCarnet(): Observable<Carnet[]> {
    return this.httpClient.get<Carnet[]>(`${this.URLBack}/obtenerListaCarnet`);

  }
  public obtenerListaCarnetEstaSemana(): Observable<Carnet[]> {
    return this.httpClient.get<Carnet[]>(`${this.URLBack}/obtenerListaCarnetEstaSemana`);

  }
  public obtenerListaCarnetEsteMes(): Observable<Carnet[]> {
    return this.httpClient.get<Carnet[]>(`${this.URLBack}/obtenerListaCarnetEsteMes`);

  }
  public obtenerListaCarnetEsteAño(): Observable<Carnet[]> {
    return this.httpClient.get<Carnet[]>(`${this.URLBack}/obtenerListaCarnetEsteAño`);

  }
  public obtenerListaNombreAZ(): Observable<Carnet[]> {
    return this.httpClient.get<Carnet[]>(`${this.URLBack}/obtenerListaNombreAZ`);

  }
  public obtenerListaNombreZA(): Observable<Carnet[]> {
    return this.httpClient.get<Carnet[]>(`${this.URLBack}/obtenerListaNombreZA`);

  }
  public obtenerListaCarnet6(): Observable<Carnet[]> {
    return this.httpClient.get<Carnet[]>(`${this.URLBack}/obtenerListaCarnet`);

  }
  public obtenerListaCarnet7(): Observable<Carnet[]> {
    return this.httpClient.get<Carnet[]>(`${this.URLBack}/obtenerListaCarnet`);

  }


  obtenerPersonaAsociada(idFicha: number): Observable<Persona> {
    return this.httpClient.get<Persona>(`${this.URLBack}/obtenerPersonaAsociada/${idFicha}`);
  }
  obtenerPersonaAsociadaPorNroCarnet(nroCarnet: number): Observable<Persona> {
    return this.httpClient.get<Persona>(`${this.URLBack}/obtenerPersonaAsociadaPorNroCarnet/${nroCarnet}`);
  }
  obtenerFicha(idCarnet: number): Observable<Ficha> {
    return this.httpClient.get<Ficha>(`${this.URLBack}/obtenerFicha/${idCarnet}`);
  }
  obtenerFichaPorNumero(idFicha2: number): Observable<Ficha> {
    return this.httpClient.get<Ficha>(`${this.URLBack}/obtenerFichaPorNumero/${idFicha2}`);
  }
  emitirCarnet(carnet: Carnet): Observable<String> {
    const httpOptions = { responseType: 'text' as 'json', };
    return this.httpClient.post<String>(`${this.URLBack}/emitirCarnet`, carnet, httpOptions);
  }
}
