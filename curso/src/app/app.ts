import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer, Header, NotificationModal, Notification } from "./main";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header, NotificationModal, Notification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
