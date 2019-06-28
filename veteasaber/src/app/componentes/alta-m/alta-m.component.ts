import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {AltaService}from '../../servicios/alta.service';

import {Mascota} from '../../clases/mascota';
import {Materia} from '../../clases/materia';

import { AngularFireStorage } from '@angular/fire/storage';

import {finalize} from 'rxjs/operators';

import {Observable } from 'rxjs';



@Component({
  selector: 'app-alta-m',
  templateUrl: './alta-m.component.html',
  styleUrls: ['./alta-m.component.css']
})

export class AltaMComponent implements OnInit {

  unaMat:Materia;

  downloadURL: Observable<string>;

  @Output() tabla :EventEmitter<any> = new EventEmitter<any>();

  unaMasc:Mascota;

  cuatrimestre = new FormControl('',[
    Validators.required    
  ]);
 
  
  nombre = new FormControl('',[
    Validators.required,
    Validators.minLength(3)
  ]);

  cupos = new FormControl('',[
    Validators.required,
    Validators.min(0)
    
  ]); 

  profesor = new FormControl('',[
    Validators.required,
    Validators.minLength(3)

    
  ]); 

  

  altaForm: FormGroup = this.builder.group({

    cuatrimestre: this.cuatrimestre,
    
    nombre : this.nombre,
    cupos : this.cupos,
    profesor : this.profesor,
    
  
  });

  archivo:any;

  constructor(private builder: FormBuilder,private as : AltaService,public storage : AngularFireStorage) { }

  ngOnInit(){

  }

  AltaMat(){

    console.log("El alta ...");

    this.unaMat = new Materia();

    this.unaMat.nombre = this.altaForm.get('nombre').value;

    this.unaMat.cuatrimestre = this.altaForm.get('cuatrimestre').value;

    this.unaMat.cupos = this.altaForm.get('cupos').value;
    this.unaMat.profesor = this.altaForm.get('profesor').value;

    this.as.altaMateria(this.unaMat);  

    // ver output
   this.tabla.emit();

  }
  
  Alta(){

    console.log("El alta ...");

    this.unaMasc = new Mascota();

    this.unaMasc.animal = this.altaForm.get('animal').value;
    this.unaMasc.dueno = this.altaForm.get('dueno').value;
    this.unaMasc.edad = this.altaForm.get('edad').value;
    this.unaMasc.nombre = this.altaForm.get('nombre').value;
    this.unaMasc.raza = this.altaForm.get('raza').value;
    this.unaMasc.foto = this.unaMasc.dueno+this.unaMasc.nombre;

    

// nombre de la foto
    // dueño+nombre

    // bien el nombre de la foto
    
    const fileRef = this.storage.ref(this.unaMasc.foto);

    // sube la foto

    const task = this.storage.upload(this.unaMasc.foto, this.archivo);

    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {this.downloadURL = fileRef.getDownloadURL();
      console.info(this.downloadURL);} )
   )
  .subscribe();
  
    //this.unaMasc.foto = this.altaForm.get('foto').value;    
  //  this.unaMasc.foto = "foto defecto";

   this.as.altaMascota(this.unaMasc);  

   this.tabla.emit();
   
  }

  uploadFile(event){

    // el archivo
    const file = event.target.files[0];
    this.archivo = file;

    let primer = this.altaForm.get('dueno').value;
    let segun = this.altaForm.get('nombre').value;
    const filePath:string = primer+segun;
    
    console.log(filePath);
    
    // guardo el filepath en foto
  //  const filePath = 'primera_subida';
   // const fileRef = this.storage.ref(filePath);


    // la subida
    // puedo meter un parametro mas con metadata
    /*
    const task = this.storage.upload(filePath, file);

    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
   )
  .subscribe()
    */
  }


} // componente
