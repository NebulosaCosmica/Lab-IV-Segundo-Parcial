import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {Usuario} from '../../clases/usuario';

import {ActivadorService}from '../../servicios/activador.service';

import {timer, Subscription} from "rxjs";

/**
 * 2° tp 1° semana de junio
 * 
 * ver pipe, en el chat te cambia la fecha, etc
 * 
 * servicios firebase
 * input output (alta uno, mostrar otro, tododepende del principal
 * el mostrar detalle incluido
 * 
 * chat que conecte cliente con administrador 
 */
// manejo de imagenes ¡?¡?¡?¡?

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})

export class IngresoComponent implements OnInit { 
  
  noLogin:boolean;

  private susc : Subscription;

  tic : number;

  elUsuario:Usuario;

  usuario= new FormControl('',[
    Validators.required,
    Validators.minLength(3)
  ]);

  clave= new FormControl('',[
    Validators.required,
    Validators.minLength(3)
  ]); 

  ingresoForm: FormGroup = this.builder.group({

    usuario:this.usuario,
    clave: this.clave,
  
  }); 
 
  constructor(private ruter :Router, private builder: FormBuilder, private afa : ActivadorService) {
    
   }

  ngOnInit() {  
    
    this.elUsuario = new Usuario(); 
    this.noLogin = false;
    
  }
  
  Ingresar(): void{    
    
    this.tic = 0;

    this.elUsuario.correo = this.ingresoForm.get('usuario').value;
    this.elUsuario.clave = this.ingresoForm.get('clave').value;
   
    //console.info(this.elUsuario);
    this.afa.login(this.elUsuario);         

    let timers = timer(200, 50);

  //  console.info(timers);

    this.susc = timers.subscribe(t=>{

      this.tic = this.tic + 1;
      
      switch (this.tic) {
        case 15:
            console.log("intento de logi");
            break;
            
        case 50:
            console.log("se está tardando demasiado");
            break;
        case 100: 
            console.log("aver aver");
            let alguien = this.afa.afAuth.auth.currentUser;

            if(alguien){
              console.log("logueado: ",alguien.email);
            }else{

              console.log("confirma el error de logueo");
              this.mostrarError();
            }

            this.susc.unsubscribe();


        break;      
        default:
          break;
      }


    });
   
  
    
  }
  
  completoYo(){
  
    this.usuario.setValue("admin@utn.com");
    this.clave.setValue("clavevalor");

  }

  completoHoy(){

    this.usuario.setValue("alum1@utn.com");
    this.clave.setValue("claypolever");

  }

  completoProf(){
    this.usuario.setValue("lagorrra@utn.com");
    this.clave.setValue("profefor2");
  }

  completoTres(){
    /*
    console.log("empleado");
    this.usuario.setValue("jacinto@perez.com");
    this.clave.setValue("bayerMe");
    */  
  } 

  mostrarError(){
    this.noLogin = true;
  }
  
} // ingreso Componente
