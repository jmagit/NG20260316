import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
// import { LoggerService } from '../../../lib/my-library';
import { Unsubscribable } from 'rxjs';
import { NotificationService, NotificationType } from '../../common-services';
import { Notification } from "../../main";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demos',
  imports: [Notification, FormsModule, ],
  templateUrl: './demos.html',
  styleUrl: './demos.css',
  // providers: [/*LoggerService,*/ NotificationService, ]
})
export class Demos implements OnInit, OnDestroy {
  public readonly nombre = signal<string>('mundo')
  public readonly fontSize = signal<number>(24)
  public readonly listado = signal([
    { id: 1, nombre: 'Madrid'},
    { id: 2, nombre: 'barcelona'},
    { id: 3, nombre: 'SEVILLA'},
    { id: 4, nombre: 'ciudad Real'},
  ])
  public readonly total = computed(() => this.listado().length)
  public readonly idProvincia = signal<number>(2)
  private fecha = new Date('2026-03-18')

  public get Fecha() : string { return this.fecha.toISOString() }
  public set Fecha(valor : string) {
    const f = new Date(valor)
    if(!f || f === this.fecha) return
    this.fecha = f
  }

  public readonly resultado = signal<string>('')
  public readonly visible = signal(true)
  public readonly estetica = signal({ importante: true, error: false, urgente: true })

  private suscriptor: Unsubscribable | undefined;

  constructor(public vm: NotificationService) { }

  saluda() {
    this.resultado.set(`Hola ${this.nombre()}`)
  }

  despide() {
    this.resultado.set(`Adios ${this.nombre()}`)
  }

  di(algo: string) {
    this.resultado.set(`Dice ${algo}`)
  }

  cambia() {
    this.visible.update(valor => !valor)
    this.estetica.update(valor => ({ ...valor, importante: !valor.importante }))
    this.estetica.update(valor => ({ ...valor, error: !valor.error }))
  }

  calcula(a: number, b: number): number { return a + b; }

  add(provincia: string) {
    if(!provincia) return;
    const id = this.total() === 0 ? 1 : this.listado().length + 1
    this.listado.update(valor => [ ...valor, { id, nombre: provincia }])
    this.idProvincia.set(id)
  }

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
