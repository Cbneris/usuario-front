import { Component } from '@angular/core';
import { Sesion } from '../../../service/sesion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {

  usuario: String = "Usuario de la Sesión";

  constructor(
      private router:   Router,
      private sesionCk: Sesion
    ){}
  
  ngOnInit(): void {
    this.usuario = this.sesionCk.obtenerNombreUsuario();
    if(!this.sesionCk.sesionActiva()){
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion(){
    this.sesionCk.cerrarSesion();
    this.router.navigate(['/login']);
  }

}
