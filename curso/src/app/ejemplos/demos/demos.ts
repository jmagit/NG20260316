import { Component, OnDestroy, OnInit } from '@angular/core';
// import { LoggerService } from '../../../lib/my-library';
import { Unsubscribable } from 'rxjs';
import { NotificationService, NotificationType } from '../../common-services';

@Component({
  selector: 'app-demos',
  imports: [],
  templateUrl: './demos.html',
  styleUrl: './demos.css',
  // providers: [LoggerService]
})
export class Demos implements OnInit, OnDestroy {
  private suscriptor: Unsubscribable | undefined;

  constructor(public vm: NotificationService) { }

  ngOnInit(): void {
    this.suscriptor = this.vm.Notificacion.subscribe(n => {
      if (n.Type !== NotificationType.error) { return; }
      // window.alert(`Suscripción: ${n.Message}`);
      // this.vm.remove(this.vm.Listado().length - 1);
    });
  }

  ngOnDestroy(): void {
    if (this.suscriptor) {
      this.suscriptor.unsubscribe();
    }
  }

  // constructor(private out: LoggerService) {
  //   out.error('Esto es una demo de error')
  //   out.warn('Esto es una demo de warn')
  //   out.info('Esto es una demo de info')
  //   out.log('Esto es una demo de log')
  // }
}
