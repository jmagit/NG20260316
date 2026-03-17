import { Component, signal } from '@angular/core';
import { LoggerService } from '../../../lib/my-library';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
    protected readonly title = signal('curso');
  constructor(_out: LoggerService) {
    // out.log('Entro en la página de inicio')
  }
}
