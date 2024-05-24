import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {puerto,ip,url}from '../Direccion/Maquina';

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  constructor(private httpClient: HttpClient) { }


  urlBack: String = `${url}/archivos`;

  descargarArchivo(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.urlBack}/descargar`, formData);
  }
  cargarArchivo(url: string): Observable<string | ArrayBuffer> {   
    return this.httpClient.get(url, { responseType: 'arraybuffer' });
  }
}
