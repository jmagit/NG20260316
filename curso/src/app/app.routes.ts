import { Routes, UrlSegment } from '@angular/router';
import { Calculadora, Demos, Formularios } from './ejemplos';
import { Home, PageNotFound } from './main';
import { AuthCanActivate, AuthCanActivateChild, AuthService, LoginForm, RegisterUser } from './security';
// import { ContactosAdd, ContactosEdit, ContactosList, ContactosView } from './contactos';

export function graficoFiles(url: UrlSegment[]) {
  return url.length === 1 && url[0].path.endsWith('.svg') ? ({consumed: url}) : null;
}

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Home },
  { path: 'inicio', component: Home },
  { path: 'demos', component: Demos },
  { path: 'chisme/de/hacer/numeros', component: Calculadora },
  { path: 'formulario', component: Formularios },

  // {
  //   path: 'contactos', children: [
  //     { path: '', component: ContactosList },
  //     { path: 'add', component: ContactosAdd },
  //     { path: ':id/edit', component: ContactosEdit },
  //     { path: ':id', component: ContactosView },
  //     { path: ':id/:kk', component: ContactosView },
  //   ]
  // },

  { path: 'contactos', loadChildren: () => import('./contactos/contactos-module').then(mod => mod.routes) },

  { path: 'alysia/baxendale', redirectTo: '/contactos/43'},

  { path: 'config', loadChildren: () => import('./config/config-module').then(mod => mod.routes), canActivateChild: [ AuthCanActivateChild ] },

  { matcher: graficoFiles, loadComponent: () => import('./ejemplos/grafico-svg/grafico-svg'), canActivate: [ AuthCanActivate ]},

  { path: 'login', component: LoginForm },
  { path: 'registro', component: RegisterUser },

  { path: '404.html', component: PageNotFound },
  { path: '**', component: PageNotFound },
];

export function generaMenu(_auth: AuthService): Option[] {
  return [
    { texto: 'Inicio', icono: 'fa-solid fa-house', path: '/inicio', visible: true },
    { texto: 'Demos', icono: 'fa-solid fa-person-chalkboard', path: '/demos', visible: true },
    { texto: 'Calculadora', icono: 'fa-solid fa-calculator', path: '/chisme/de/hacer/numeros', visible: true },
    { texto: 'Formulario', icono: 'fa-solid fa-chalkboard-user', path: '/formulario', visible: true },
    { texto: 'Contactos', icono: 'fa-solid fa-address-book', path: '/contactos', visible: true },
    { texto: 'Alysia', icono: 'fa-solid fa-address-book', path: '/alysia/baxendale', visible: true },
    { texto: 'Foto', icono: 'fa-solid fa-image', path: '/no-existe.svg', visible: true },
    { texto: 'Config', icono: 'fa-solid fa-gears', path: '/config', visible: _auth.isAuthenticated(), children: [
      { texto: 'Perfil', icono: 'fa-solid fa-user-pen', path: '/config/perfil', visible: true },
      { texto: 'Permisos', icono: 'fa-solid fa-screwdriver-wrench', path: '/config/permisos', visible: true },
    ] },
    { texto: 'Falla', icono: 'fa-solid fa-ban', path: '/desconocido', visible: true },
  ]
}

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
