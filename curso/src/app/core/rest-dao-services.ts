import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export abstract class RESTDAOService<T, K> {
  protected readonly baseUrl = environment.apiURL;
  protected http = inject(HttpClient)

  constructor(entidad: string, protected option = {}) {
    if(entidad.toLocaleLowerCase().startsWith('http'))
      this.baseUrl = entidad
    else
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
