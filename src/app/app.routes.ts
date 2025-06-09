import { Routes } from '@angular/router';
import { Login } from './Components/login/login';
import { Home } from './Components/home/home';
import { GestionUsuarios } from './Components/gestion-usuarios/gestion-usuarios';
import { TableroBuscadorUsuarios } from './Components/tablero-buscador-usuarios/tablero-buscador-usuarios';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'gestion-usuarios', component: GestionUsuarios },
  { path: 'tablero-usuarios', component: TableroBuscadorUsuarios }
];