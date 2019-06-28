import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VeterinariaComponent } from './componentes/veterinaria/veterinaria.component';
import { ErrorComponent } from './componentes/error/error.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';

import {ActivadorService}from './servicios/activador.service';
import { AltaComponent } from './componentes/alta/alta.component';
import { IngresoComponent } from './componentes/ingreso/ingreso.component';

import { ChatComponent } from './componentes/chat/chat.component';
import { MascotasComponent } from './componentes/mascotas/mascotas.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';

import { PedirTurnoComponent } from './componentes/pedir-turno/pedir-turno.component';
import { ChatClienteComponent } from './componentes/chat-cliente/chat-cliente.component';
import { MasClienteComponent } from './componentes/mas-cliente/mas-cliente.component';

import { ProfesorComponent } from './componentes/profesor/profesor.component';
import { MuestraUsrComponent } from './componentes/muestra-usr/muestra-usr.component';

import { VerMatComponent } from './componentes/ver-mat/ver-mat.component';

const routes: Routes = [
  {path: '', redirectTo:'veterinaria',pathMatch: 'full'},
  {path: 'veterinaria',component: VeterinariaComponent, children:[
    {path: 'alta',component: AltaComponent},
    {path: 'ingreso', component: IngresoComponent}  
  ]},
  {path: 'error',component: ErrorComponent},
  {path: 'admin',component: AdminComponent, canActivate:[ActivadorService], children: [
    {path: 'chat', component: ChatComponent},
    {path: 'mascotas', component: MascotasComponent},
    {path: 'turnos', component: TurnosComponent},
    {path: 'usuarios', component: MuestraUsrComponent}
  ]},
  {path: 'alumno',component: ClienteComponent , canActivate:[ActivadorService],
children:[
  {path: 'chat', component: ChatClienteComponent},
  {path: 'mascotas', component: MasClienteComponent},
  {path: 'turnos', component: PedirTurnoComponent},
  {path: 'vermat', component: VerMatComponent}
]},

  {path: 'profesor', component : ProfesorComponent, canActivate:[ActivadorService]},

  {path: '**',component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
