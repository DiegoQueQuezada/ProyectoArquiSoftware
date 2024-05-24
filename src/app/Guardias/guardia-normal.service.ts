import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutService } from '../Servicios/aut.service';

@Injectable({
  providedIn: 'root'
})
export class GuardiaNormal implements CanActivate{
  

  constructor(private router:Router,private autService:AutService){ }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.autService.seInicioSesion()){
      return true;
  }
    this.router.navigate(['/login']);
    return false;
  }
}
