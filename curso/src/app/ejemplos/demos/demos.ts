import { Component } from '@angular/core';
import { LoggerService } from '../../../lib/my-library';

@Component({
  selector: 'app-demos',
  imports: [],
  templateUrl: './demos.html',
  styleUrl: './demos.css',
  // providers: [LoggerService]
})
export class Demos {
  constructor(private out: LoggerService) {
    // out.error('Esto es una demo de error')
    // out.warn('Esto es una demo de warn')
    // out.info('Esto es una demo de info')
    // out.log('Esto es una demo de log')
  }
}
