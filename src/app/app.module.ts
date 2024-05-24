import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { FichaPersonaComponent } from './Componentes/4.ficha-persona/ficha-persona.component';
import { RegistroPersonaComponent } from './Componentes/2.registro-persona/registro-persona.component';
import { ListaPersonasComponent } from './Componentes/3.lista-personas/lista-personas.component';
import { DetallePersonaComponent } from './Componentes/detalle-persona/detalle-persona.component';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import  localEs from '@angular/common/locales/es';
import { MomentModule } from 'ngx-moment';
import { AprobacionFichaComponent } from './Componentes/aprobacion-ficha/aprobacion-ficha.component';
import { ListaCarnetsComponent } from './Componentes/lista-carnets/lista-carnets.component';
import { DetalleCarnetComponent } from './Componentes/detalle-carnet/detalle-carnet.component';
import { LoginComponent } from './Componentes/1.login/login.component';
import { MenuComponent } from './Componentes/menu/menu.component';
import { AutInterceptadorService } from './Guardias/guardia-interceptador.service';
import { ModificarPersonaComponent } from './Componentes/modificar-persona/modificar-persona.component';
import { ExportarComponent } from './Componentes/exportar/exportar.component';

registerLocaleData(localEs);

@NgModule({
  declarations: [
    AppComponent,
    RegistroPersonaComponent,
    ListaPersonasComponent,
    FichaPersonaComponent,
    DetallePersonaComponent,
    AprobacionFichaComponent,
    ListaCarnetsComponent,
    DetalleCarnetComponent,
    LoginComponent,
    MenuComponent,
    ModificarPersonaComponent,
    ExportarComponent,
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    DatePipe,
    HttpClientModule,
    FormsModule,
    MomentModule,
    CommonModule,
  ],
  providers: [
    DatePipe,
    {  
    provide:LOCALE_ID,
    useValue:'es',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutInterceptadorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
