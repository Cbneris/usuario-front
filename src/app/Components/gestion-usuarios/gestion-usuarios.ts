import { Nav }                    from '../estrustura-web/nav/nav';
import { TITULO }                 from '../../Util/Alerta/TituloMsg';
import { Component }              from '@angular/core';
import { SEVERIDAD }              from '../../Util/Alerta/TipoSeveridad';
import { USUARIO_FORM }           from '../../Util/Forms/usuarioForm';
import { ALERTA_MENSAJE }         from '../../Util/Alerta/AlertasFn';
import { TransaccionesHTTP }      from '../../service/transacciones-http';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { Usuario } from '../../Model/Usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector:     'app-gestion-usuarios',
  imports:      [Nav, ReactiveFormsModule, CommonModule],
  templateUrl:  './gestion-usuarios.html',
  styleUrl:     './gestion-usuarios.css'
})

export class GestionUsuarios {
  usuarioForm!:   FormGroup;
  listUsuarios:   Usuario [] = [];

  constructor(    
    private fb:                   FormBuilder,
    private transaccionesService: TransaccionesHTTP
  ){}

  ngOnInit(): void {
    this.configurarCamposUsuario();
    this.cargaListaUsuarios();
  }

  cargaListaUsuarios() {
    this.transaccionesService.cargaListUsuarios()
    .then((response : any) => {
      console.log(response.entity);
      this.listUsuarios = response.entity
    })
  }

  configurarCamposUsuario(){
    this.usuarioForm = this.fb.group( USUARIO_FORM );
  }

  guardaUsuario(){
    if(!this.usuarioForm.valid){
      ALERTA_MENSAJE(
        "Debe completar todos los campos para el el registro del usuario",
        SEVERIDAD.ERROR,
        TITULO.ERROR,
        true,
        true
      );
      return;
    }

    this.transaccionesService.guardaUsuario(this.usuarioForm.getRawValue())
    .then(( response: any) => {
        console.log(response);
        if(response.code == 201){
          ALERTA_MENSAJE(
            response.message + response.entity.login,
            SEVERIDAD.SUCCESS,
            TITULO.EXITO,
            true,
            true
          );
          this.usuarioForm.reset();
        }
      }
    )
    .catch(error => {
      if(error.status == 400){
        ALERTA_MENSAJE(
          error.error.message,
          SEVERIDAD.ERROR,
          TITULO.ERROR,
          true,
          true
        );
      }
    })
    .finally(
      () => {
        this.cargaListaUsuarios();
      }
    );
  }

  cargarFormulario(usuario: Usuario): void {

    this.usuarioForm.patchValue({
      login:          usuario.login,
      password:       usuario.password,
      nombre:         usuario.nombre,
      cliente:        usuario.cliente,
      email:          usuario.email,
      intentos:       usuario.intentos,
      fechaRevocado:  this.formatDateForInput(usuario.fechaRevocado),
      fechaVigencia:  this.formatDateForInput(usuario.fechaVigencia),
      noAcceso:       usuario.noAcceso,
      apellidoPaterno: usuario.apellidoPaterno,
      apellidoMaterno: usuario.apellidoMaterno,
      area:           usuario.area,
      status:         usuario.status
    });
    
  }

  private formatDateForInput(dateInput: string | Date | null | undefined): string | null {
    if (!dateInput) return null;

    const date  = new Date(dateInput);
    const year  = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day   = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  bajaUsuario(usuario: Usuario): void {
  this.transaccionesService.bajaUsuario(usuario).subscribe({
    next: () => {
      console.log('Usuario dado de baja correctamente');
      // Opcional: actualizar la lista o el campo status
      this.cargaListaUsuarios(); // o actualizar solo usuario.status = 'B';
    },
    error: (err) => {
      console.error('Error al dar de baja al usuario', err);
    }
  });
}


}
