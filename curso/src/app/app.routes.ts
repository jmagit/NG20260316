import { Routes } from '@angular/router';
import { Demos } from './ejemplos';
import { Home, PageNotFound } from './main';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Home },
  { path: 'inicio', component: Home },
  { path: 'demos', component: Demos },

  { path: '404.html', component: PageNotFound },
  { path: '**', component: PageNotFound },
];
