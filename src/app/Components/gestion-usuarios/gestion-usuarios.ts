import { Nav }                    from '../estrustura-web/nav/nav';
import { Component }              from '@angular/core';
import { USUARIO_FORM }           from '../../Util/Forms/usuarioForm';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-gestion-usuarios',
  imports: [Nav, ReactiveFormsModule],
  templateUrl: './gestion-usuarios.html',
  styleUrl: './gestion-usuarios.css'
})
export class GestionUsuarios {
  usuarioForm!: FormGroup;

  constructor(    
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.configurarCamposUsuario();
  }

  configurarCamposUsuario(){
    this.usuarioForm = this.fb.group( USUARIO_FORM );
  }

  guardaUsuario(){
    console.log(this.usuarioForm.getRawValue());    
  }
}
