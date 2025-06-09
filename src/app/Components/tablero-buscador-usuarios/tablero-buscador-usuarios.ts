import { Nav }                from '../estrustura-web/nav/nav';
import { Usuario }            from '../../Model/Usuario';
import { Component }          from '@angular/core';
import { CommonModule }       from '@angular/common';
import { TransaccionesHTTP }  from '../../service/transacciones-http';
import { FormsModule } from '@angular/forms';

@Component({
  selector:     'app-tablero-buscador-usuarios',
  imports:      [Nav, CommonModule, FormsModule],
  templateUrl:  './tablero-buscador-usuarios.html',
  styleUrl:     './tablero-buscador-usuarios.css'
})

export class TableroBuscadorUsuarios {

  nombreFiltro: string = '';
  fechaAltaStr: string = '';
  fechaBajaStr: string = '';

  fechaAlta:    Date | null = null;
  fechaBaja:    Date | null = null;
  
  listUsuarios:           Usuario[] = [];
  listaOriginalUsuarios:  Usuario[] = [];

  constructor(
      private transaccionesService: TransaccionesHTTP
  ){}

  ngOnInit(): void {
    this.cargaListaUsuarios();
  }

  limpiafiltros(){
    this.nombreFiltro = '';
    this.fechaAltaStr = '';
    this.fechaBajaStr = '';

    this.muestraListaOriginal();
  }

  cargaListaUsuarios() {
    this.transaccionesService.cargaListUsuarios()
    .then((response : any) => {
      this.listaOriginalUsuarios = response.entity
      this.listUsuarios = [...this.listaOriginalUsuarios];
    })
  }

  onFechaAltaChange() {
    this.fechaAlta = this.fechaAltaStr ? new Date(this.fechaAltaStr) : null;    
  }

  onFechaBajaChange() {
    this.fechaBaja = this.fechaBajaStr ? new Date(this.fechaBajaStr) : null;
  }

  filtrarPorStatus(status: string) {
    this.listUsuarios = this.listaOriginalUsuarios.filter(usuario => usuario.status === status);
  }

  muestraListaOriginal(){
    this.listUsuarios = this.listaOriginalUsuarios;
  }

  busquedaPorFiltros(){
    const nombreFiltro = this.nombreFiltro.trim().toLowerCase();

    //Carga la lista original previamente consultada sí no ay filtros llenos
    if(!nombreFiltro && !this.fechaAlta && !this.fechaBaja){
      this.listUsuarios = [...this.listaOriginalUsuarios];
      return;
    }

    this.listUsuarios = this.listaOriginalUsuarios.filter(usuario => {
      const nombreCoincide = this.nombreFiltro
        ? usuario.nombre?.toLowerCase().includes(this.nombreFiltro.toLowerCase()) ?? false
        : true;
      
      const fechaAltaUsuario = usuario.fechaAlta ? new Date(usuario.fechaAlta) : null;
      const fechaAltaCoincide = this.fechaAlta
        ? fechaAltaUsuario && this.sonMismasFechas(fechaAltaUsuario, this.fechaAlta)
        : true;

      const fechaBajaUsuario = usuario.fechaBaja ? new Date(usuario.fechaBaja) : null;
      const fechaBajaCoincide = this.fechaBaja
        ? fechaBajaUsuario && this.sonMismasFechas(fechaBajaUsuario, this.fechaBaja)
        : true;

      return nombreCoincide && fechaAltaCoincide && fechaBajaCoincide;
    });
  }

  sonMismasFechas(fecha1: Date, fecha2: Date): boolean {
    return fecha1.toISOString().slice(0, 10) === fecha2.toISOString().slice(0, 10);
  }

}
