import { Component, ElementRef, ViewChild } from '@angular/core';
import { AutService } from 'src/app/Servicios/aut.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  @ViewChild('botonAcoplar', { static: true }) botonAcoplar: ElementRef;

  constructor(public autService: AutService) { }
  ngOnInit(): void {
    this.botonAcoplar.nativeElement.addEventListener('click', () => {
      
      document.getElementById("")
      
      
    });
  }

  public cerrar() {
    this.autService.cerrarSesion();
    window.location.reload();
  }
}
