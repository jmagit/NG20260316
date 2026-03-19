import { Component, signal } from '@angular/core';
import { Injectable } from '@angular/core';

type Modos = 'add' | 'edit'

interface Persona {
  id: number
  nombre: string
  apellidos: string
  edad: number
  telefono: string[]
}

@Injectable({ providedIn: 'root' })
export class PersonaViewModel {
  modo = signal<Modos>('add')
  elemento = signal<Persona>({
    id: 0,
    nombre: '',
    apellidos: '',
    edad: NaN,
    telefono: []
  })

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  add() {
    this.elemento.set({
      id: 0,
      nombre: '',
      apellidos: '',
      edad: NaN,
      telefono: []
    })
    this.modo.set('add')
  }

  edit(key: number) {
    this.elemento.set({
      "id": key,
      "nombre": "Camelo",
      "apellidos": "Coton",
      "edad": 37,
      "telefono": [
        "123 424 435",
        "555 000 111"
      ]
    })
    this.modo.set('edit')
  }

  send() {
    switch(this.modo()) {
      case 'add':
        alert(`POST -> ${JSON.stringify(this.elemento())}`)
        break;
      case 'edit':
        alert(`PUT -> ${JSON.stringify(this.elemento())}`)
        break;
    }
  }
}
@Component({
  selector: 'app-formularios',
  imports: [],
  templateUrl: './formularios.html',
  styleUrl: './formularios.css',
})
export class Formularios {
  constructor(public vm: PersonaViewModel) {}
}
