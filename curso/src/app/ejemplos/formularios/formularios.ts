import { JsonPipe, UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorMessagePipe, NIFNIEValidator, TypeValidator, UppercaseValidator } from '../../../lib/my-library';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../common-services';
import { AUTH_REQUIRED } from '../../security';

type Modos = 'add' | 'edit'

interface Persona {
  id: number
  nombre: string
  apellidos: string
  edad: number
  telefono: string[]
}

abstract class RESTDAOService<T, K> {
  protected baseUrl = environment.apiURL;
  protected http = inject(HttpClient)

  constructor(entidad: string, protected option = {}) {
    this.baseUrl += entidad;
  }
  query(extras = {}): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl, Object.assign({}, this.option, extras));
  }
  get(id: K, extras = {}): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`, Object.assign({}, this.option, extras));
  }
  add(item: T, extras = {}): Observable<T> {
    return this.http.post<T>(this.baseUrl, item, Object.assign({}, this.option, extras));
  }
  change(id: K, item: T, extras = {}): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, item, Object.assign({}, this.option, extras));
  }
  remove(id: K, extras = {}): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${id}`, Object.assign({}, this.option, extras));
  }
}

@Injectable({providedIn: 'root'})
export class PersonasDAOService extends RESTDAOService<Persona, number> {
  constructor() {
    super('personas', { context: new HttpContext().set(AUTH_REQUIRED, true)})
  }

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
  constructor(private dao: PersonasDAOService, private notify: NotificationService) { }

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
    this.dao.get(key).subscribe({
      next: data => {
        this.elemento.set(data)
        this.modo.set('edit')
      },
      error: err => { this.notify.add(err.status) }
    })
    // this.elemento.set({
    //   "id": key,
    //   "nombre": "Camelo",
    //   "apellidos": "Coton",
    //   "edad": 37,
    //   "telefono": [
    //     "123 424 435",
    //     "555 000 111"
    //   ]
    // })
    // this.modo.set('edit')
  }

  send() {
    switch(this.modo()) {
      case 'add':
        // alert(`POST -> ${JSON.stringify(this.elemento())}`)
        this.dao.add(this.elemento()).subscribe({
          next: _data => {
            this.notify.add('añadido')
          },
          error: err => { this.notify.add(err.status) }
        })
        break;
      case 'edit':
        // alert(`PUT -> ${JSON.stringify(this.elemento())}`)
        this.dao.change(this.elemento().id, this.elemento()).subscribe({
          next: _data => {
            this.notify.add('modificado')
          },
          error: err => { this.notify.add(err.status) }
        })
        break;
    }
  }
}
@Component({
  selector: 'app-formularios',
  imports: [FormsModule, JsonPipe, ErrorMessagePipe, NIFNIEValidator, TypeValidator, UppercaseValidator],
  templateUrl: './formularios.html',
  styleUrl: './formularios.css',
})
export class Formularios {
  constructor(public vm: PersonaViewModel) {}
}
