import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {Usuario} from '../../clases/usuario';

import {AltaService}from '../../servicios/alta.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})


// el copiaClave, un detalle para más adelante
/**
 * function copiaClave(input: FormControl) {

      if (input.root.get('clave') == null) {
        return null;
      }

      const verificar = input.root.get('clave').value === input.value;
      return verificar ? null : { mismaClave : true };
  }

   copiaClave = new FormControl('', [
    Validators.required,
    copiaClave
  ]);
 */


export class AltaComponent implements OnInit {

  unUsuario:Usuario;
  
  correo = new FormControl('',[
    Validators.required,
    Validators.email    
  ]);

  clave = new FormControl('',[
    Validators.required,
    Validators.minLength(6)
  ]); 

  // ver copia Clave
  perfil = new FormControl('',[
    Validators.required,
    Validators.minLength(3)
  ]);

  altaForm: FormGroup = this.builder.group({

    correo: this.correo,
    clave: this.clave,
    perfil : this.perfil
  
  });

  constructor(private builder: FormBuilder,private as : AltaService) { }

  ngOnInit() {

    this.unUsuario = new Usuario();
  }

  Alta(){
    console.log("El alta ...");
   // console.log(this.altaForm.get('correo').value); 

    this.unUsuario.correo = this.altaForm.get('correo').value;
    this.unUsuario.clave = this.altaForm.get('clave').value;
    this.unUsuario.perfil = this.altaForm.get('perfil').value;

    console.info(this.unUsuario);
    
    // crea el usuario
    this.as.altaUsuario(this.unUsuario);
    
  }

}
