import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reactive',
    loadChildren: () => import('./reactive/reactives.routes'),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'), //export by default
  },
  {
    path: 'country',
    loadChildren: () =>
      import('./country/country.routes').then((m) => m.countryRoutes), //chain
  },
  {
    path: '**',
    redirectTo: 'basic',
  },
];
