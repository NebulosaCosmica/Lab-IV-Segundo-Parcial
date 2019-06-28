import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {AltaService}from '../../servicios/alta.service';

import {Mascota} from '../../clases/mascota';

import { AngularFireStorage } from '@angular/fire/storage';

import {finalize} from 'rxjs/operators';

import {Observable } from 'rxjs';

@Component({
  selector: 'app-cli-alta-m',
  templateUrl: './cli-alta-m.component.html',
  styleUrls: ['./cli-alta-m.component.css']
})
export class CliAltaMComponent implements OnInit {

  @Input() usuarie : string = '';

  downloadURL: Observable<string>;

  @Output() tabla :EventEmitter<any> = new EventEmitter<any>();

  unaMasc:Mascota;

  animal = new FormControl('',[
    Validators.required    
  ]);

  raza = new FormControl('',[
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

  foto = new FormControl('',[
    Validators.required    
  ]); 

  altaForm: FormGroup = this.builder.group({

    animal: this.animal,
    raza: this.raza,
    nombre : this.nombre,
    edad : this.edad,   
    foto : this.foto
  
  });

  archivo:any;


  constructor(private builder: FormBuilder,private as : AltaService,public storage : AngularFireStorage) { }

  ngOnInit() {
   
  }

  Alta(){

    console.log("El alta ...");

    this.unaMasc = new Mascota();

    this.unaMasc.animal = this.altaForm.get('animal').value;

    // this.unaMasc.dueno = this.altaForm.get('dueno').value;
    this.unaMasc.dueno = this.usuarie;
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
   
   this.as.altaMascota(this.unaMasc);  

   this.tabla.emit();
   
  }

  uploadFile(event){

    // el archivo
    const file = event.target.files[0];
    this.archivo = file;

    let primer = this.usuarie;
    let segun = this.altaForm.get('nombre').value;
    const filePath:string = primer+segun;
    
   // console.log(filePath);    
   
  }

}
