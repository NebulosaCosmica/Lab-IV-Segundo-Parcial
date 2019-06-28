import { Component, OnInit,Input,Output, EventEmitter  } from '@angular/core';

import {Usuario} from '../../clases/usuario';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// traer todos y cambiarlo con el select

// correo clave perfil

@Component({
  selector: 'app-muestra-usr',
  templateUrl: './muestra-usr.component.html',
  styleUrls: ['./muestra-usr.component.css']
})
export class MuestraUsrComponent implements OnInit {

  viene: Observable<any[]>;

  seleccion:string;

  usuariosFiltros:Usuario[];

  // alumno profesor admin

  losUsuarios:Usuario[];

  constructor(private db: AngularFirestore) {
    this.viene = this.db.collection('usuarios').valueChanges(); 
   }

  ngOnInit() {

    this.usuariosFiltros = new Array();
    this.losUsuarios = new Array();

    this.transFire();
    
  }

  transFire():void{    
    
    this.viene.forEach(element => {
      
      element.forEach(elemento => {


        if(this.seleccion == undefined){

          let usuario = new Usuario();
          
          usuario.correo = elemento.correo;
          usuario.perfil = elemento.perfil;

          this.losUsuarios.push(usuario);
        }else{

          console.info(elemento.perfil);
          if(this.seleccion == elemento.perfil)        
          {
            let usuario = new Usuario();
            usuario.correo = elemento.correo;
  
            usuario.perfil = elemento.perfil;
            this.losUsuarios.push(usuario);
          }
       
          
        }

     
          
          
          
          
          
       
        
      });   

      this.usuariosFiltros = this.losUsuarios;
    
      this.mostrarLista();    
    });

  }

  mostrarLista():void{

   // console.info(this.losUsuarios);
   
  }

  listaNueva(){
    //console.info(this.seleccion);

    // console.info(this.usuariosFiltros);

    this.usuariosFiltros = this.losUsuarios;

   this.usuariosFiltros = this.usuariosFiltros.filter(elemento=>{
     return elemento.perfil == this.seleccion;
   })


  }
}
