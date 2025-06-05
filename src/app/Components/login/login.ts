import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LOGIN_FORM } from '../../Util/Forms/LoginForm';
import { TransaccionesHTTP } from '../../service/transacciones-http';
import Swal from 'sweetalert2';

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
    private fb:                   FormBuilder,
    private transaccionesService: TransaccionesHTTP
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
      Swal.fire({
            title: "Error",
            text: "Debe completar los campos para el inicio de sesión",
            icon: "error"
          });
          return;
    }

    this.transaccionesService.iniciarSesion(this.loginForm.getRawValue())
      .then((response: any) => {
        console.log(response);

        if(response.code == 200){
          Swal.fire({
            title: "Bienvenido",
            text: response.message,
            icon: "success"
          });
        }
                
      }).catch(error=>{
        
        if(error.status == 400){
           Swal.fire({
            title: "Error",
            text: error.error.message,
            icon: "error"
          });
        }
        
        if(error.status == 403){
           Swal.fire({
            title: "Atención",
            text: error.error.message,
            icon: "warning"
          });
        }

      }).finally(
        () => {
          this.verificaDatosSesion();
        }
      );
  }

  verificaDatosSesion(){
    
  }

}
