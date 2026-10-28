import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Weather Dashboard',
    loadComponent: () =>
      import('./presentation/pages/home/home.page').then((module) => module.HomePage),
  },
  {
    path: 'forecast/:id',
    title: 'Previsão do tempo',
    loadComponent: () =>
      import('./presentation/pages/forecast/forecast.page').then((module) => module.ForecastPage),
  },
  {
    path: '**',
    title: 'Página não encontrada',
    loadComponent: () =>
      import('./presentation/pages/not-found/not-found.page').then((module) => module.NotFoundPage),
  },
];
