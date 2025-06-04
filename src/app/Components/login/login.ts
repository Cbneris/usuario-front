import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LOGIN_FORM } from '../../Util/Forms/LoginForm';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm!:       FormGroup;
  iniciandoSesion:  boolean = false;

  constructor(    
    private fb:                   FormBuilder
  ){
    this.configurarCamposLogin();
  }
  
  ngOnInit(): void {}

  configurarCamposLogin(){
    this.loginForm = this.fb.group( LOGIN_FORM );
  }
  
  iniciarSesionEntrarKey() {
    this.iniciarSesion();
  }
  
  iniciarSesion(){
    
    if(!this.loginForm.valid){
      console.log("Datos Invalidos");
    }

  }

}
