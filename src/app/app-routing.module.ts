import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPersonasComponent } from './Componentes/3.lista-personas/lista-personas.component';
import { RegistroPersonaComponent } from './Componentes/2.registro-persona/registro-persona.component';
import { FichaPersonaComponent } from './Componentes/4.ficha-persona/ficha-persona.component';
import { DetallePersonaComponent } from './Componentes/detalle-persona/detalle-persona.component';
import { AprobacionFichaComponent } from './Componentes/aprobacion-ficha/aprobacion-ficha.component';
import { ListaCarnetsComponent } from './Componentes/lista-carnets/lista-carnets.component';
import { DetalleCarnetComponent } from './Componentes/detalle-carnet/detalle-carnet.component';
import { LoginComponent } from './Componentes/1.login/login.component';
import { GuardiaNormal } from './Guardias/guardia-normal.service';
import { ModificarPersonaComponent } from './Componentes/modificar-persona/modificar-persona.component';
import { ExportarComponent } from './Componentes/exportar/exportar.component';


const routes: Routes = [
  { path: 'lista', component: ListaPersonasComponent,canActivate:[GuardiaNormal] },
  { path: 'municipal', component: RegistroPersonaComponent,canActivate:[GuardiaNormal] },
  { path: 'ficha/:id', component: FichaPersonaComponent,canActivate:[GuardiaNormal] },
  { path: 'detalle/:id', component: DetallePersonaComponent,canActivate:[GuardiaNormal] },
  { path: 'modificar/:id', component: ModificarPersonaComponent,canActivate:[GuardiaNormal] },
  { path: 'aprobacionFicha/:id', component: AprobacionFichaComponent,canActivate:[GuardiaNormal] },
  { path: 'lista2', component: ListaCarnetsComponent,canActivate:[GuardiaNormal] },
  { path: 'detalleCarnet/:id', component: DetalleCarnetComponent,canActivate:[GuardiaNormal] },
  { path: 'login', component: LoginComponent, },
  { path: 'export', component: ExportarComponent,canActivate:[GuardiaNormal] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
]
@NgModule(
  {
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
