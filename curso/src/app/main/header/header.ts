import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  menu = signal<Option[]>([])

  constructor() {
    this.actualizaMenu()
  }
  actualizaMenu() {
    this.menu.set([
      { texto: 'Inicio', icono: 'fa-solid fa-house', path: '/inicio', visible: true },
      { texto: 'Demos', icono: 'fa-solid fa-person-chalkboard', path: '/demos', visible: true },
      { texto: 'Falla', icono: 'fa-solid fa-ban', path: '/desconocido', visible: true },
    ])
  }
}
