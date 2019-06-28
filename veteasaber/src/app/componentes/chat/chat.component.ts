import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import {PipesModule} from '../../modulos/pipes/pipes.module';

// how to import properly? XD
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  // lo que viene de la base, tipo traer todos
  items: Observable<any[]>;  

   // agregar un mensaje a la bd (ver enviar())
   elmensaje:string;

   miLista: any[]; 

   // fechaaaaaaaaaaah
  pruebaFecha :firebase.firestore.Timestamp;
  

  constructor(private db: AngularFirestore) { 
    this.items = this.db.collection('chatAC').valueChanges();    
  }

  ngOnInit() {   

    this.miLista= new Array();      
    this.verLoQueHay(); 
  }

  verLoQueHay(){   
    
    this.items.forEach(element => {   

      element.forEach(elemento => {

        //    console.info(elemento);
       this.miLista.push({'mensaje':elemento.mensaje,'usuario': elemento.usuario,'fecha':elemento.fecha.toDate()})
        
      });

      this.ordenar();
      console.info(this.miLista);

    });

  }

  enviar() : void{    

    
  this.pruebaFecha = firebase.firestore.Timestamp.now();



  this.db.collection('chatAC').add({
    mensaje: this.elmensaje,
    fecha: this.pruebaFecha,
    usuario: "Administrador"    
    
  }).then(function(ref) {
 //   console.log("Bien hecho! ID: ",ref.id);    
})
.catch(function(error) {
  console.error("Error al subir el mensaje: ", error);
});

  this.miLista = [];  
  this.elmensaje = "";

  } // enviar

  ordenar() :void{        

    let ordenado: any[] = new Array();
    ordenado = this.miLista;
  

    ordenado.sort(function(a:any,b:any){
      
      // no es un timestamp, es un date
      //excelente
      //return a.fechayhora - b.fechayhora;
      return (a.fecha - b.fecha) * -1;

      
    });
 
  }


}
