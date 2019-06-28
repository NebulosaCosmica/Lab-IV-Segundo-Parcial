import { Injectable } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
//import {auth} from 'firebase/app';

import {Usuario} from '../clases/usuario';
import {Mascota} from '../clases/mascota';
import {Materia} from '../clases/materia';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AltaService {

  constructor(private afAuth : AngularFireAuth, private db: AngularFirestore) { }

  altaUsuario(unUsuario:Usuario){

    return this.afAuth.auth.createUserWithEmailAndPassword(unUsuario.correo,unUsuario.clave)
    .then(res=>{
      console.log("Usuario creado");
      // crear el reflejo en el firestore

      this.altaCloud(unUsuario);
     


    })
    .catch(err=>{

      // revisar este error (si hace falta)
      Promise.reject(err);
    });

  }

  altaCloud(unUsuario :Usuario){

 // puedo guardar todo, pero guardo correo y perfil
 this.db.collection('usuarios').add({
  'correo' :  unUsuario.correo,
  'perfil' : unUsuario.perfil
  })
  .then(ref=>{
    console.log('cloud actualizada');
   // console.info(ref.id);
  })
  .catch(err=>{

    // revisar este error (si hace falta)
    Promise.reject(err);
  });
  }

  altaMascota(unaM:Mascota){
   
    if(typeof(unaM.foto)== 'string')

      this.db.collection('mascotas').doc(unaM.foto).set({

    'animal' : unaM.animal,
    'dueño' : unaM.dueno,
    'edad' : unaM.edad,
    'foto' : unaM.foto,
    'nombre' : unaM.nombre,
    'raza' : unaM.raza

    })
    .then(function() {
      console.log("Nueva Mascota Adentro!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });  
   

  }

  altaMateria(unaM:Materia){
   
   

      this.db.collection('materias').doc(unaM.nombre).set({

    'nombre' : unaM.nombre,
    'cuatrimestre' : unaM.cuatrimestre,
    'cupos' : unaM.cupos,    
    'profesor' : unaM.profesor

    })
    .then(function() {
      console.log("Nueva Materia Adentro!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });  
   

  }

  // el nombre del documento, dueno+nombre viejos
  modificaMascota(unaM:Mascota,docu:string){
    console.info("Mascota modificada",unaM);

    // actualizo todos los campos, piso todo, con foto y todo
    // si no lo actualiza, le paso el mismo, y piso todo   

    // me dio cosa actualizar el animal y la raza

   this.db.collection('mascotas').doc(docu).update({
    'animal' : unaM.animal,
    'dueño' : unaM.dueno,
    'edad' : unaM.edad,
    'foto' : unaM.foto,
    'nombre' : unaM.nombre,
    'raza' : unaM.raza
    
          
    })
    .then(function() {
      console.log("Document successfully updated!");
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });

  
  
  }

  altaTurno(turno:any){

    this.db.collection('inscripciones').add({

      'correo' : turno.correo,
      'materia' : turno.materia

    })
    .then(ref=>{
      console.log('turno hecho');
     // console.info(ref.id);
    })
    .catch(err=>{
  
      // revisar este error (si hace falta)
      Promise.reject(err);
    });

  }


}// servicio
