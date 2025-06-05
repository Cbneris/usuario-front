import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class Sesion {

  enSesion: boolean = false;
  
  constructor(private cookieService: CookieService) {}
  
  guardarSesion(login: string, nombreUsuario: string): void {
    this.cookieService.set('login', login);
    this.cookieService.set('nombreUsuario', nombreUsuario);
    this.enSesion = true;
  }

  obtenerLogin(): string {
    return this.cookieService.get('login');
  }

  obtenerNombreUsuario(): string {
    return this.cookieService.get('nombreUsuario');
  }

  cerrarSesion(): void {
    this.cookieService.delete('login');
    this.cookieService.delete('nombreUsuario');
    this.enSesion = false;
  }

  sesionActiva(): boolean{
    return this.enSesion;
  }

}
