import { Component, OnInit,Pipe } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {ActivadorService}from '../../servicios/activador.service';
import {Router} from '@angular/router';

import {PipesModule} from '../../modulos/pipes/pipes.module';

//import {TimeAgoPipe} from 'time-ago-pipe';

// how to import properly? XD
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-veterinaria',
  templateUrl: './veterinaria.component.html',
  styleUrls: ['./veterinaria.component.css']
})

// Usuairos: 
// admin@utn.com clavevalor
// cliente@utn.com quierover

// atonito@utn.com primercliente
// nuevoad@utn.com elnuevojefe



/**  
 * alta de usuarios  OK 
 * 
 * ingreso de usuarios OK
 * 
 * canActivate OK (con botones)
 * 
 * mail visible OK
 * 
 * si el listado de mascotas se lo paso por input
 * no debe ser una ruta aparte  
 * 
 * alta con foto   OK
 * 
 * mostrar mascota bien en la tabla OK
 *  y en el detalle OK
 * 
 * si toqueteo mucho se rompe :O
 *  
 * Hago el modificar mascota dentro del detalle
 * 
 * // para modificar, necesito que el documento funcione como id
// lo llamo como la foto, dueno+nombre

prueba el nuevo alta OK
 
 un modal donde modificar lo que se pueda, modifica todo
 
 b. Modificar una mascota OK

 cerrar modal, refrescar tabla (detalle) OK

 d. Ver listado de turnos. OK

 Admin OK 

 alta de mensajes del chat, con usuario, fecha y mensaje

 el html con la tablita y el textarea (copiar verfire)

 // la interfaz es la misma cliente y admin, cambia el usuario
 // que le puedo poner el perfil admin (a los administradores)

 // y el email a los clientes

 // cloud collection creada como chatAC

 d. Pedir turno. OK
 turnos : turno : Fecha (y hora), correo: cliente 

 chat OK 
 
 Cliente...
 replicar mascotas con la variación para clientes
 
Alta de mascotas OK
tomo el mail para decirle el dueño

ver mascota (las de su usuario) OK
c. Ver Mascotas.

modificar mascota (las suyas) probar
b. Modificar Mascota es el mismo, sin dueno change.

preparar el tp

 */

 // directiva que cambie el color de las materias si el cupo es mayor a 10 
 // y otro color si es mayor a 20

 // la ruta cliente va a ser para el alumno

 // el nuevo componente profesor

 // Usuairos nuevos: 
// admin@utn.com clavevalor
// nuevoad@utn.com elnuevojefe

// alum1@utn.com claypolever (alumno)

// lagorrra@utn.com profefor2 (profesor)

export class VeterinariaComponent implements OnInit {

 // ago: firebase.firestore.Timestamp;

 // no me anda el pipeAgo
  ago : Date;

  viene: Observable<any[]>;

  listaMensajes: any[];
  
  constructor(private db: AngularFirestore,private ruter : Router, private afa : ActivadorService) {
    this.viene = this.db.collection('chat').valueChanges();
  }
  
  ngOnInit() {   
 
    this.listaMensajes = new Array();
    this.transFire();  
    
    //this.ago = firebase.firestore.Timestamp.now();

    this.ago = new Date( Date.now());
  }

  transFire():void{

    // ver si hace falta
    this.listaMensajes = [];

    this.viene.forEach(element => {

      element.forEach(elemento => {


        this.listaMensajes.push({'mensaje':elemento.mensaje});
        
      });
      
      // this.mostrarLista();

    });

  }

  mostrarLista():void{

    console.info(this.listaMensajes);
  }

  IrACliente(){
   
    this.ruter.navigate(['alumno']);
  }

  IrAAdmin(){
    
    this.ruter.navigate(['admin']);

  }  

  IrAProfe(){
    
    this.ruter.navigate(['profesor']);

  }  

  Salir(){
    this.afa.logout();   
  }  

}
