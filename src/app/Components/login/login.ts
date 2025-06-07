import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LOGIN_FORM } from '../../Util/Forms/LoginForm';
import { TransaccionesHTTP } from '../../service/transacciones-http';
import Swal from 'sweetalert2';
import { Sesion } from '../../service/sesion';
import { Router } from '@angular/router';
import { SEVERIDAD } from '../../Util/Alerta/TipoSeveridad';
import { ALERTA_MENSAJE } from '../../Util/Alerta/AlertasFn';
import { TITULO } from '../../Util/Alerta/TituloMsg';

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
    private sesionCk:             Sesion,
    private router:               Router,
    private fb:                   FormBuilder,
    private transaccionesService: TransaccionesHTTP
  ){
    this.configurarCamposLogin();
  }
  
  ngOnInit(): void {
    console.log("Datos de la sesion");
    this.verificaDatosSesion();
  }

  configurarCamposLogin(){
    this.loginForm = this.fb.group( LOGIN_FORM );
  }
  
  iniciarSesionEntrarKey() {
    this.iniciarSesion();
  }
  
  iniciarSesion(){

    if(!this.loginForm.valid){
      ALERTA_MENSAJE(
        "Debe completar los campos para el inicio de sesión",
        SEVERIDAD.ERROR,
        TITULO.ERROR,
        true,
        true
      );
      return;
    }

    this.transaccionesService.iniciarSesion(this.loginForm.getRawValue())
      .then((response: any) => {

        if(response.code == 200){

          this.sesionCk.guardarSesion(
            response.entity.login, 
            response.entity.nombre + " " + response.entity.apellidoPaterno + " " + response.entity.apellidoMaterno
          );

          ALERTA_MENSAJE(
            response.message,
            SEVERIDAD.SUCCESS,
            TITULO.BIENVENIDA,
            true,
            true
          );
          
          this.loginForm.reset();
        }
                
      }).catch(error=>{
        
        if(error.status == 400){
          ALERTA_MENSAJE(
            error.error.message,
            SEVERIDAD.ERROR,
            TITULO.ERROR,
            true,
            true
          );
        }
        
        if(error.status == 403){
          ALERTA_MENSAJE(
            error.error.message,
            SEVERIDAD.WARNING,
            TITULO.ERROR,
            true,
            true
          );
        }
      }).finally(
        () => {
          this.verificaDatosSesion();
        }
      );
  }

  verificaDatosSesion(){
    if(this.sesionCk.sesionActiva()){
      this.router.navigate(['/home']);
      this.iniciandoSesion = false;
    }
  }

}
