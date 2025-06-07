import { Nav }                    from '../estrustura-web/nav/nav';
import { Component }              from '@angular/core';
import { USUARIO_FORM }           from '../../Util/Forms/usuarioForm';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { TransaccionesHTTP } from '../../service/transacciones-http';
import { ALERTA_MENSAJE } from '../../Util/Alerta/AlertasFn';
import { SEVERIDAD } from '../../Util/Alerta/TipoSeveridad';
import { TITULO } from '../../Util/Alerta/TituloMsg';

@Component({
  selector: 'app-gestion-usuarios',
  imports: [Nav, ReactiveFormsModule],
  templateUrl: './gestion-usuarios.html',
  styleUrl: './gestion-usuarios.css'
})
export class GestionUsuarios {
  usuarioForm!: FormGroup;

  constructor(    
    private fb:                   FormBuilder,
    private transaccionesService: TransaccionesHTTP
  ){}

  ngOnInit(): void {
    this.configurarCamposUsuario();
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
      
    });
  }
}
