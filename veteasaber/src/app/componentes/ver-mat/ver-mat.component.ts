import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ver-mat',
  templateUrl: './ver-mat.component.html',
  styleUrls: ['./ver-mat.component.css']
})
export class VerMatComponent implements OnInit {

  viene: Observable<any[]>;

  materias:any[];


  constructor( private db: AngularFirestore) {
    this.viene = this.db.collection('inscripciones').valueChanges(); 
  }

  ngOnInit() {

    this.materias = new Array();
    this.transFire();
  }

  transFire():void{    
    
    this.viene.forEach(element => {
      
      element.forEach(elemento => {


      
      
         this.materias.push({'correo':elemento.correo,'materia':elemento.materia}) ;
      
     
          
      });
          
          
          
       
        
      });   

    
  

  }



}
