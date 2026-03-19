import { Routes } from '@angular/router';
import { Calculadora, Demos, Formularios } from './ejemplos';
import { Home, PageNotFound } from './main';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Home },
  { path: 'inicio', component: Home },
  { path: 'demos', component: Demos },
  { path: 'chisme/de/hacer/numeros', component: Calculadora },
  { path: 'formulario', component: Formularios },

  { path: '404.html', component: PageNotFound },
  { path: '**', component: PageNotFound },
];


export interface Option {
  texto: string
  icono: string
  path?: string
  children?: Child[]
  visible: boolean
}
export interface Child {
  texto: string
  icono: string
  path: string
  separado?: boolean
  visible: boolean
}

export const menu = [
      { texto: 'Inicio', icono: 'fa-solid fa-house', path: '/inicio', visible: true },
      { texto: 'Demos', icono: 'fa-solid fa-person-chalkboard', path: '/demos', visible: true },
      { texto: 'Calculadora', icono: 'fa-solid fa-calculator', path: '/chisme/de/hacer/numeros', visible: true },
      { texto: 'Formulario', icono: 'fa-solid fa-chalkboard-user', path: '/formulario', visible: true },
      { texto: 'Falla', icono: 'fa-solid fa-ban', path: '/desconocido', visible: true },
    ]
