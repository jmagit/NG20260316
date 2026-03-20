import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
// import { LoggerService } from '../../../lib/my-library';
import { Unsubscribable } from 'rxjs';
import { NotificationService, NotificationType } from '../../common-services';
// import { Notification } from "../../layout";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CapitalizePipe, ElipsisPipe, Sizer } from '../../../lib/my-library';
import { FormButtons, Card } from "../../common-component";
import { Calculadora } from '../calculadora/calculadora';
import { RouterLink } from "@angular/router";
// import GraficoSvg from '../grafico-svg/grafico-svg';

@Component({
  selector: 'app-demos',
  imports: [/*Notification,*/ FormsModule, CommonModule, ElipsisPipe, CapitalizePipe, Sizer, FormButtons, Card /*, GraficoSvg*/, Calculadora, RouterLink],
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

  public get Fecha() : string { return this.fecha.toISOString().substring(0,10) }
  public set Fecha(valor : string) {
    const f = new Date(valor)
    if(f.toString() === "Invalid Date" || f === this.fecha) return
    this.fecha = f
  }

  public readonly resultado = signal<string>('')
  public readonly visible = signal(true)
  public readonly estetica = signal({ importante: true, error: false, urgente: true })

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

  add(provincia: string) {
    if(!provincia) return;
    const id = this.total() === 0 ? 1 : this.listado().length + 1
    this.listado.update(valor => [ ...valor, { id, nombre: provincia }])
    this.idProvincia.set(id)
  }

  calcula(a: number, b: number): number { return a + b; }

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
  // Ejemplo de Calculadora
  idiomas = signal([
    { codigo: 'en-US', region: 'USA' },
    { codigo: 'es', region: 'España' },
    { codigo: 'pt', region: 'Portugal' },
  ]).asReadonly();
  idioma = signal(this.idiomas()[0].codigo);
  calculos = signal<Calculo[]>([]);
  valCalculadora = signal(666);

  ponResultado(origen: string, valor: number) {
    this.calculos.update(value => [ ...value, {
      pos: this.calculos.length + 1,
      origen,
      valor: +valor
    }]);
  }
}
interface Calculo {
  pos: number
  origen: string
  valor: number
}
