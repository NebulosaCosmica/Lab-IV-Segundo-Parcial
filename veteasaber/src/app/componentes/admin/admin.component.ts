import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  muestraMail:string;

    
  constructor(private afAuth : AngularFireAuth) { }
  
  ngOnInit() {

 
    this.muestraMail = "";

    let user = this.afAuth.auth.currentUser;

    if (user) {
      // User is signed in.
     // console.log(user.email);      
      this.muestraMail = user.email;
    } else {
    
      // No user is signed in.
    
    }

  }

     
}
