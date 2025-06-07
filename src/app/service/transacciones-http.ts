import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioLoginRequest } from '../Model/UsuarioLoginRequest';
import { RequestMapping } from '../Util/Constantes/RequestMapping';
import { UsuarioSaveRequest } from '../Model/UsuarioSaveRequest';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesHTTP {
  
  private baseLocalUrl = 'http://localhost:8080';  
  request: RequestMapping = new RequestMapping();

  constructor(private http: HttpClient) {}

  iniciarSesion( user : UsuarioLoginRequest ){
    return this.http.post(  `${ this.baseLocalUrl }${this.request.LoginController}${this.request.LoginUsuario}`, user ).toPromise();
  }

  guardaUsuario(usuarioNew: UsuarioSaveRequest){
    return this.http.post(`${this.baseLocalUrl}${this.request.UserController}${this.request.GuardarUsuarioNuevo}`, usuarioNew).toPromise();
  }

}