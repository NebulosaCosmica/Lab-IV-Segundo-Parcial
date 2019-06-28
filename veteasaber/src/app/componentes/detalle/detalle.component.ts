import { Component, OnInit,Input,Output,EventEmitter, ViewChild,ElementRef } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';
import {Observable } from 'rxjs';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {AltaService}from '../../servicios/alta.service';

import {Mascota} from '../../clases/mascota';

import {finalize} from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';

import { AngularFireAuth } from '@angular/fire/auth';


// para modificar, necesito que el documento funcione como id
// lo llamo como la foto, dueno+nombre

//acomodar todo para que el modificar quede piola


// asignarle los valores del objeto (sin la foto)
// no quiero modificar el animal ni la raza

// modificar el html y el ts de alta a modificar

// probar

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  
  muestraMail:string;

  @ViewChild('btnClose') btnClose : ElementRef; 

  downloadURL: Observable<string>;

  @Output() tabla :EventEmitter<any> = new EventEmitter<any>();

  // mascota modificada
  unaMasc:Mascota;

  animal = new FormControl({disbled: true},[
    Validators.required    
  ]);

  raza = new FormControl({disabled: true},[
    Validators.required
    
  ]); 
  
  nombre = new FormControl('',[
    Validators.required,
    Validators.minLength(3)
  ]);

  edad = new FormControl('',[
    Validators.required,
    Validators.min(0)
    
  ]); 

  dueno = new FormControl('',[
    Validators.required,
    Validators.minLength(3)

    
  ]); 

  foto = new FormControl('',[
    Validators.required    
  ]); 

  altaForm: FormGroup = this.builder.group({

    animal: this.animal,
    raza: this.raza,
    nombre : this.nombre,
    edad : this.edad,
    dueno : this.dueno,
    foto : this.foto
  
  });

  archivo:any;

 // profileUrl: Observable<string | null>;
  @Input() mascota:any;  

  // mostrar bien una mascota

  // ver el async o etc.

  viene: Observable<any[]>;

  listaUsuarios: any[];


  constructor(private builder: FormBuilder,private as : AltaService, private storage: AngularFireStorage, private db: AngularFirestore,  private afAuth : AngularFireAuth) {    

    this.viene = this.db.collection('usuarios').valueChanges();
    this.listaUsuarios = new Array();
    this.transFire(); 

    
    
  }
  
  ngOnInit() {

    this.muestraMail = "";  

    let user = this.afAuth.auth.currentUser;

    if (user) {
    //  console.log(user.email);
      // User is signed in.
      
      this.muestraMail = user.email;
    } else {
    
      // No user is signed in.
    
    }


    
    // uso el file path, creo
    if(this.mascota == undefined){

      console.log("mascota sin iniciar");
      
    }else{

     // const ref = this.storage.ref(this.mascota.foto);
     // this.profileUrl = this.mascota.foto;

      //console.info(this.profileUrl);

    }
    
  }

  modificar(){
    // pasar el nombre
    //console.log(this.mascota.dueno+this.mascota.nombre);
    console.log('modifico el objeto seleccionado');

    // le paso los valores al form para modificarlos

    this.animal.setValue(this.mascota.animal);
    this.raza.setValue(this.mascota.raza);

    this.dueno.setValue(this.mascota.dueno);
    this.nombre.setValue(this.mascota.nombre);
    this.edad.setValue(this.mascota.edad);

    // quiero ver el perfil del usuario

  }

  ModificarM(){

    let docum:string = this.mascota.dueno+this.mascota.nombre;

    console.log("Modifico la mascota seleccionada ...");

    this.unaMasc = new Mascota();

    this.unaMasc.animal = this.altaForm.get('animal').value;

    // usuario mail
    if(this.obtenerPerfil(this.muestraMail) == 'cliente'){
      console.log("Un cliente modifica su mascota");
       this.unaMasc.dueno = this.muestraMail;
    } else{

      this.unaMasc.dueno = this.altaForm.get('dueno').value;
    }
    this.unaMasc.edad = this.altaForm.get('edad').value;
    this.unaMasc.nombre = this.altaForm.get('nombre').value;
    this.unaMasc.raza = this.altaForm.get('raza').value;
    // nombre de la foto (y del documento)
    // dueño+nombre
    this.unaMasc.foto = this.unaMasc.dueno+this.unaMasc.nombre;
    
    const fileRef = this.storage.ref(this.unaMasc.foto);

    
    // sube la foto
    const task = this.storage.upload(this.unaMasc.foto, this.archivo);

    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {this.downloadURL = fileRef.getDownloadURL();
      console.info(this.downloadURL);} )
   )
  .subscribe(); 
  
   this.as.modificaMascota(this.unaMasc,docum);  

   this.tabla.emit();

   this.btnClose.nativeElement.click();
   
  }

  uploadFile(event){

    // el archivo
    const file = event.target.files[0];
    this.archivo = file;    
  
  }

  transFire():void{

    this.viene.forEach(element => {

      element.forEach(elemento => {


        this.listaUsuarios.push({'correo':elemento.correo, 'perfil':elemento.perfil});
        
      });
      
    //  console.info(this.listaUsuarios);

    });
  }

  obtenerPerfil(mail:string):string|boolean{

    this.listaUsuarios.forEach(element => {
          
      if(mail == element.correo){
  
        console.info(mail);
        console.log(element.perfil);
  
        // tengo el perfil
       
      return element.perfil;
      }
  
    });  
    
    return false;
  }
  

  

} // componente
