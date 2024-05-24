import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutService } from '../Servicios/aut.service';

@Injectable()
export class AutInterceptadorService implements HttpInterceptor {

  constructor(private autService: AutService) { }
  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this.autService.obtenerToken();
    if (token != null) {
      httpRequest = httpRequest.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    }
    return httpHandler.handle(httpRequest);
  }

}
