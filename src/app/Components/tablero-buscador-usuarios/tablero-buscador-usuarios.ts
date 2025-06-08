import { Nav }                from '../estrustura-web/nav/nav';
import { Usuario }            from '../../Model/Usuario';
import { Component }          from '@angular/core';
import { CommonModule }       from '@angular/common';
import { TransaccionesHTTP }  from '../../service/transacciones-http';

@Component({
  selector: 'app-tablero-buscador-usuarios',
  imports: [Nav, CommonModule],
  templateUrl: './tablero-buscador-usuarios.html',
  styleUrl: './tablero-buscador-usuarios.css'
})

export class TableroBuscadorUsuarios {
  
  listUsuarios:           Usuario[] = [];
  listaOriginalUsuarios:  Usuario[] = [];

  constructor(
      private transaccionesService: TransaccionesHTTP
  ){}

  ngOnInit(): void {
    this.cargaListaUsuarios();
  }

  cargaListaUsuarios() {
    this.transaccionesService.cargaListUsuarios()
    .then((response : any) => {
      this.listaOriginalUsuarios = response.entity
      this.listUsuarios = [...this.listaOriginalUsuarios];
    })
  }

  filtrarPorStatus(status: string) {
    this.listUsuarios = this.listaOriginalUsuarios.filter(usuario => usuario.status === status);
  }

  limpiafiltros(){
    this.listUsuarios = this.listaOriginalUsuarios;
  }

}
