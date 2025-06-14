import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class Sesion {
  
  constructor(private cookieService: CookieService) {}
  
  guardarSesion(login: string, nombreUsuario: string): void {
    const diasExpiracion = 1;
    this.cookieService.set('login', login, diasExpiracion);
    this.cookieService.set('nombreUsuario', nombreUsuario, diasExpiracion);
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
  }

  sesionActiva(): boolean{    
    return this.cookieService.check('login') && this.cookieService.check('nombreUsuario');
  }

}
