import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {AltaService}from '../../servicios/alta.service';

// how to import properly? XD
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.css']
})
export class PedirTurnoComponent implements OnInit {

  // seleccion:string;

  verTe: boolean;

  usuario:string;

  // ver si hace falta
  unTurno:any;

  materia = new FormControl('',[
    Validators.required    
  
  ]);

  altaForm: FormGroup = this.builder.group({

    materia : this.materia
  });


  constructor(private afAuth : AngularFireAuth, private builder: FormBuilder,private as : AltaService) { }

  ngOnInit() {

    this.verTe = true;

    let user = this.afAuth.auth.currentUser;

    if (user) {
      console.log(user.email);
      // User is signed in.
      
      this.usuario = user.email;
    } else {
    
      // No user is signed in.
    
    }
  }

  Alta(){

    console.log("La inscripcion ...");          

    this.unTurno = {'correo':this.usuario,'materia' : this.altaForm.get('materia').value};
    // let aver = new Date(this.unTurno.turno);

    // ahi tengo el timestamp
   // this.unTurno.turno = firebase.firestore.Timestamp.fromDate(aver);   
    
    // console.info(this.unTurno);
    
    
    // crea el turno
    this.as.altaTurno(this.unTurno);
    
    this.verTe = false;
    
  }



}
