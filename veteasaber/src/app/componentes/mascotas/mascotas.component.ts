import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

import {Mascota} from '../../clases/mascota';
import {Materia} from '../../clases/materia';
@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})

// revisar el manejo de la lista que pasa por input, que falla

export class MascotasComponent implements OnInit {

  

  seleccionada:any;

  viene: Observable<any[]>;

  listaMascotas: Mascota[];  

  listaMaterias:Materia[];

  mostrarListado:boolean;

  altaMas:boolean;

  constructor(private db: AngularFirestore,private ruter : Router) {
    this.viene = this.db.collection('materias').valueChanges(); 


    
   // console.info(this.viene);
    
  }
  
  ngOnInit() {

   // this.listaMascotas = new Array();   
    this.listaMaterias = new Array();
    this.transFire();  
    
    this.mostrarListado = false;
    this.altaMas = false;
   

  }

  transFire():void{    
    
    this.viene.forEach(element => {
      
      element.forEach(elemento => {
        
     //   console.info(elemento);
        /*
        let mascota = new Mascota();

        mascota.animal = elemento.animal;
        mascota.dueno = elemento.dueño;
        mascota.edad = elemento.edad;
        mascota.foto = elemento.foto;
        mascota.nombre = elemento.nombre;
        mascota.raza = elemento.raza;

        this.listaMascotas.push(mascota);
        */

        let materia = new Materia();

        materia.nombre = elemento.nombre;
        materia.cuatrimestre = elemento.cuatrimestre;
        materia.cupos = elemento.cupos;
        materia.profesor = elemento.profesor

        this.listaMaterias.push(materia);
        
      });   
    
      this.mostrarLista();    
    });

  }

  mostrarLista():void{

    console.info(this.listaMaterias);
   // console.info(this.listaMascotas);
  }

  cambio():void{
    
    if(this.mostrarListado == false){
      this.mostrarListado = true;
    }else{
      this.mostrarListado = false;
    }
  }

   cambia():void{
   
    if(this.altaMas == false){
      this.altaMas = true;
    }else{
      this.altaMas = false;
    }
  }

  

  escSel(masc){
    console.log("Recibo la seleccion");
    console.info(masc);
    
    this.seleccionada = masc;
  }  
  
  refresh(event){

// asi no duplica la lista

//this.listaMaterias = [];
  //  this.listaMascotas = [];   

    this.cambia();

    
  }
  
  refrescaU(event){

    this.seleccionada = undefined;

    // navego para que se refresque la lista
    this.ruter.navigate(['/admin']);

   
  }

}// componente
