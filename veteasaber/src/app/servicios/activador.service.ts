import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Router }  from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import {Usuario} from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})

export class ActivadorService implements CanActivate {  

  errorLogueo:string;

  viene: Observable<any[]>;

  listaUsuarios: any[];

  constructor(public afAuth : AngularFireAuth, private ruter : Router, private db: AngularFirestore) {
    this.viene = this.db.collection('usuarios').valueChanges();
    this.listaUsuarios = new Array();
    this.transFire();   
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean>{  
    
    /*
    console.log(route);
    console.log(state);
    //  console.log('url dentro de canActivate', url);
    */    
    
    let puede : boolean = false;
    
    let user = this.afAuth.auth.currentUser; 


    
    let rutaOk:string = route.url.toString();
    // console.info(route.url.toString());
    
    // a veces aparece vacía, si tipeo en la barra
    // ni idea. Uso botones siempre    
    console.info(this.listaUsuarios);    
   
    if(user){

      this.listaUsuarios.forEach(element => {
        
        if(user.email == element.correo){
    
          console.info(user.email);
          console.log(element.perfil);
    
          // tengo el perfil
          // no redirijo aca, sino en el login
        puede = this.dividirAguas(element.perfil,rutaOk);
    
       // cambio esto por el return del dividir aguas
        /*
        if(rutaOk == element.perfil){          
          puede = true;        
        }
        */
        }
    
      });     
     

     
    }else{
      console.log("a loguearse");
      return false;
    }

    console.info(puede);
    return puede;    

  }

  

  login(usuario:Usuario):Promise<any> | any{
   this.afAuth.auth.signInWithEmailAndPassword(usuario.correo,usuario.clave)  
  
    .then(us=>{
      console.log('bienvenido: ',us.user.email);

      this.obtenerPerfil(us.user.email);
      return us;
     
    })
    .catch(err=>{
      console.log('algo pasó: ', err.message);
      return err;
    });    
    
  }

  logout(){
    this.afAuth.auth.signOut();
    console.log("Sin usuario");
  }

  verU(){
    console.info(this.afAuth.auth.currentUser.email);
  }

  transFire():void{

    this.viene.forEach(element => {

      element.forEach(elemento => {


        this.listaUsuarios.push({'correo':elemento.correo, 'perfil':elemento.perfil});
        
      });
      
    //  console.info(this.listaUsuarios);

    });

  }

dividirAguas(perfil:string, ruta:string):boolean{

  //console.info(ruta);
 
switch (perfil) {
  case 'admin':      
              return true;

  case 'profesor':
      if(ruta == 'admin' || ruta =='alumno'){

        console.log('un profe no puede acceder');
        return false;
      }else{

                   
                    return true;
                  }
      
  case 'alumno':
      if(ruta == 'admin' || ruta =='profesor'){

        console.log('un alumno no puede acceder');
        return false;
      }else{

                   
                    return true;
                  }
  
      
  default:
      this.ruter.navigate(['error']);
    return false;     
}

}

obtenerPerfil(mail:string){

  this.listaUsuarios.forEach(element => {
        
    if(mail == element.correo){

      console.info(mail);
      console.log(element.perfil);

      // tengo el perfil
     // this.dividirAguas(element.perfil,'');
      switch(element.perfil){
        case 'admin':      
                    this.ruter.navigate(['admin']);                     
                    break;

        case 'alumno':
            this.ruter.navigate(['alumno']);
            break;

        case 'profesor':
          this.ruter.navigate(['profesor']);
          break;

        default:
        this.ruter.navigate(['error']);
        break;

      }
    
    }

  });   
}

} // servicio
