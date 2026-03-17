import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer, Header } from "./main";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
