import { Component, OnDestroy, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { generaMenu, Option, } from '../../app.routes';
import { AuthService, Login, LOGIN_EVENT, LOGOUT_EVENT } from '../../security';
import { EventBusService } from '../../common-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Login],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnDestroy {
  private login$: Subscription;
  menu = signal<Option[]>([])

  constructor(public auth: AuthService, private eventBus: EventBusService) {
    this.login$ = this.eventBus.on(LOGIN_EVENT, () => {
      this.actualizaMenu()
    })
    this.login$.add(this.eventBus.on(LOGOUT_EVENT, () => {
      this.actualizaMenu()
    }))
    this.actualizaMenu()
  }
  ngOnDestroy(): void {
    this.login$.unsubscribe();
  }
  actualizaMenu() {
    this.menu.set(generaMenu(this.auth))
  }
}
