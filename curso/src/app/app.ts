import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer, Header, NotificationModal, /*Notification,*/ AjaxWait } from "./main";
import { NavigationService } from './common-services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header, /*Notification,*/ NotificationModal, AjaxWait],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(_cargar: NavigationService) {
    // para generar la instancia de NavigationService
  }
}
