import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Option, menu as MenuPrincipal } from '../../app.routes';
import { Login } from '../../security';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Login],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  menu = signal<Option[]>([])

  constructor() {
    this.actualizaMenu()
  }
  actualizaMenu() {
    this.menu.set(MenuPrincipal)
  }
}
