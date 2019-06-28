import { Component, OnInit } from '@angular/core';

import {ActivadorService}from '../../servicios/activador.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private afa : ActivadorService, private ruter:Router) { }

  ngOnInit() {
  }

  salir(){
    this.afa.logout();   
    this.ruter.navigate(['']);
  }

}
