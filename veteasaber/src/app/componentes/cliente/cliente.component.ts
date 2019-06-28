import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  muestraMail:string;
  constructor(private afAuth : AngularFireAuth) { }
  
  ngOnInit() {
    this.muestraMail = "";  

    let user = this.afAuth.auth.currentUser;

    if (user) {
      console.log(user.email);
      // User is signed in.
      
      this.muestraMail = user.email;
    } else {
    
      // No user is signed in.
    
    }
  }

}
