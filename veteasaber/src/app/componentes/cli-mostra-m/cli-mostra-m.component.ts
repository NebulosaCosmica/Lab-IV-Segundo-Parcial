import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';

import {Mascota} from '../../clases/mascota';

import { AngularFireStorage } from '@angular/fire/storage';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-cli-mostra-m',
  templateUrl: './cli-mostra-m.component.html',
  styleUrls: ['./cli-mostra-m.component.css']
})
export class CliMostraMComponent implements OnInit {

  profileUrl: Observable<string | null>;

  // el imput
  @Input() misMascotas:Mascota[];  

  masFotos:Mascota[];
  
  @Output() mandaMas:EventEmitter<any> = new EventEmitter<any>();

  constructor(private storage: AngularFireStorage) { }

  ngOnInit() {

    this.masFotos = new Array();
    
    // existe (por ahi si no estoy apurado)
    console.info(this.misMascotas);

    
    this.misMascotas.forEach(element => {
      
      this.masFotos.push(element);

    });

    // lo tengo
    //console.info(this.masFotos);

  this.conFotos();
    
  }

  aDetalle(masc){
    //  console.log('Mandar objeto por output', masc);
      this.mandaMas.emit(masc);
    }
  
    //funca
    conFotos(){
  //    console.info(this.masFotos[6]);
  
    //  let ruta = this.masFotos[6].foto;
  
      // pido la foto
  
  
      //const ref = this.storage.ref(ruta);
      //this.profileUrl = ref.getDownloadURL();
  
      this.masFotos.forEach(element => {
  
        if(element.foto == "foto defecto"){
          element.foto = new Observable<any>();
        } else {
  
       //   console.log(typeof(element.foto));
          if(typeof(element.foto) == "string"){
  
            let refe = this.storage.ref(element.foto);
            element.foto = refe.getDownloadURL();
          }
        }
        
  
      });
  
  
    }

}
