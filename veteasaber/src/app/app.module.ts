import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VeterinariaComponent } from './componentes/veterinaria/veterinaria.component';
import { ErrorComponent } from './componentes/error/error.component';

import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdminComponent } from './componentes/admin/admin.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { BotonVolverComponent } from './componentes/boton-volver/boton-volver.component';

import {ActivadorService}from './servicios/activador.service';

import { IngresoComponent } from './componentes/ingreso/ingreso.component';
import { AltaComponent } from './componentes/alta/alta.component';

import {AltaService}from './servicios/alta.service';
import { ChatComponent } from './componentes/chat/chat.component';
import { MascotasComponent } from './componentes/mascotas/mascotas.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { MostrarMComponent } from './componentes/mostrar-m/mostrar-m.component';
import { AltaMComponent } from './componentes/alta-m/alta-m.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { LogoutComponent } from './componentes/logout/logout.component';

import { PedirTurnoComponent } from './componentes/pedir-turno/pedir-turno.component';
import { ChatClienteComponent } from './componentes/chat-cliente/chat-cliente.component';
import { MasClienteComponent } from './componentes/mas-cliente/mas-cliente.component';
import { CliMostraMComponent } from './componentes/cli-mostra-m/cli-mostra-m.component';
import { CliAltaMComponent } from './componentes/cli-alta-m/cli-alta-m.component';
import { CliModMComponent } from './componentes/cli-mod-m/cli-mod-m.component';
import { ProfesorComponent } from './componentes/profesor/profesor.component';
import { MuestraUsrComponent } from './componentes/muestra-usr/muestra-usr.component';
import { VerMatComponent } from './componentes/ver-mat/ver-mat.component';





@NgModule({
  declarations: [
    AppComponent,
    VeterinariaComponent,
    ErrorComponent,
    AdminComponent,
    ClienteComponent,
    BotonVolverComponent,
    IngresoComponent,
    AltaComponent,
    ChatComponent,
    MascotasComponent,
    TurnosComponent,
    MostrarMComponent,
    AltaMComponent,
    DetalleComponent,
    LogoutComponent,
    PedirTurnoComponent,
    ChatClienteComponent,
    MasClienteComponent,
    CliMostraMComponent,
    CliAltaMComponent,
    CliModMComponent,
    ProfesorComponent,
    MuestraUsrComponent,
    VerMatComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase,"Veterinaria"),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule
   
  ],
  providers: [ActivadorService,AltaService, { provide: StorageBucket, useValue: 'veteasabermascotas.appspot.com' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
