import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./add/add.component').then(m => m.AddComponent)
  },
  { 
    path: 'list',
    loadComponent: () =>
      import('./list/list.component').then(m => m.ListComponent)
  },
  {
    path: 'favourite',
    loadComponent: () =>
      import('./list/list.component').then(m => m.ListComponent)
  }
];
