import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-boton-volver',
  templateUrl: './boton-volver.component.html',
  styleUrls: ['./boton-volver.component.css']
})
export class BotonVolverComponent implements OnInit {

  constructor(private ruter:Router) { }

  ngOnInit() {
  }

  volver(){

  //  console.log('inicio');
    this.ruter.navigate(['/']);
  }
}
