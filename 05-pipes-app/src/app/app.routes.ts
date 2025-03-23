import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'basic',
    title: 'Basics pipes',
    loadComponent: () => import('./pages/basic-page/basic-page.component'),
  },
  {
    path: 'number',
    title: 'Numbers pipes',
    loadComponent: () => import('./pages/number-page/number-page.component'),
  },
  {
    path: 'custom',
    title: 'Customs pipes',
    loadComponent: () => import('./pages/custom-page/custom-page.component'),
  },
  {
    path: 'uncommon',
    title: 'Uncommons pipes',
    loadComponent: () =>
      import('./pages/uncommon-page/uncommon-page.component'),
  },
  {
    path: '**',
    redirectTo: 'basic',
  },
];
