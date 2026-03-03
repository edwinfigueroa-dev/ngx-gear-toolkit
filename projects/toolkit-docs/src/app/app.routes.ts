import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(r => r.routes),
  },
  {
    path: 'ui',
    loadChildren: () => import('./features/ui/ui.routes').then(r => r.routes),
  },
  {
    path: 'validators',
    loadChildren: () => import('./features/validators/validators.routes').then(r => r.routes),
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
