import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

import {Mascota} from '../../clases/mascota';

import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-mas-cliente',
  templateUrl: './mas-cliente.component.html',
  styleUrls: ['./mas-cliente.component.css']
})
export class MasClienteComponent implements OnInit {

  muestraMail:string;

  seleccionada:any;

  viene: Observable<any[]>;

  listaMascotas: Mascota[];  

  mostrarListado:boolean;

  altaMas:boolean;


  constructor(private db: AngularFirestore,private ruter : Router, private afAuth : AngularFireAuth) {
    this.viene = this.db.collection('mascotas').valueChanges();    
   }

  ngOnInit() {

    this.muestraMail = "";  

    let user = this.afAuth.auth.currentUser;

    if (user) {
      console.log(user.email);
      // User is signed in.
      
      this.muestraMail = user.email;
    } else {
    
      // No user is signed in.
    
    }

    this.listaMascotas = new Array();        
    this.transFire(); 
    
    // le paso las mascotas que son del cliente logueado
    // vacio
    // this.misMas();
    
    this.mostrarListado = false;
    this.altaMas = false;

  }

  transFire():void{    
    
    this.viene.forEach(element => {
      
      element.forEach(elemento => {
        
        let mascota = new Mascota();

        mascota.animal = elemento.animal;
        mascota.dueno = elemento.dueño;
        mascota.edad = elemento.edad;
        mascota.foto = elemento.foto;
        mascota.nombre = elemento.nombre;
        mascota.raza = elemento.raza;

        this.listaMascotas.push(mascota);
        
      });   
    
      this.mostrarLista();  
      
      this.misMas();
    });

  }

  mostrarLista():void{

    console.info(this.listaMascotas);
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
    this.listaMascotas = [];   

    this.cambia();

    
  }
  
  refrescaU(event){

    this.seleccionada = undefined;

    // navego para que se refresque la lista
    this.ruter.navigate(['/cliente']);

   
  }

  misMas(){

    let miListaM :any[]= new Array();

    // current user OK
    // console.log(this.muestraMail);

    // asincronico vacio?, si vacio
    console.info(this.listaMascotas);
    this.listaMascotas.forEach(element => {

   //   console.log(element.dueno);

      
       if(element.dueno == this.muestraMail){
        miListaM.push(element);
       }
      
    });

    // por que esta vacia? fijate donde haces el traslado
    // va en el medio de los foreachs
//    console.info(miListaM);

   this.listaMascotas = miListaM;

  }



}
