import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Observable} from 'rxjs';

// copiar la lista del componente mascotas

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  // lo que viene
  viene: Observable<any[]>;
  // lo que muestro
  listadoTurnos: any[];  

  constructor(private db: AngularFirestore) {
    this.viene = this.db.collection('turnos').valueChanges();       
   }

  ngOnInit() {
    this.listadoTurnos = new Array();        
    this.transFire();  
  }

  transFire():void{    
    
    this.viene.forEach(element => {
      
      element.forEach(elemento => {
        
        this.listadoTurnos.push({'correo':elemento.correo,'turno':elemento.turno.toDate()});

        
      });   
    
      this.mostrarLista();    
    });

  }

  mostrarLista():void{

    console.info(this.listadoTurnos);

    // transformar el timestamp para mostrarlo, o algo asi


  }

}
