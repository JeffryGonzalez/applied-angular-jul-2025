import { Routes } from '@angular/router';
import { Books } from './books';
import { List } from './pages/list';
import { Stats } from './pages/stats';
import { Prefs } from './pages/prefs';
import { Details } from './component/details';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: Books,
    children: [
      {
        path: 'list',
        component: List,
      },
      {
        path: 'stats',
        component: Stats,
      },
      {
        path: 'prefs',
        component: Prefs,
      },
      {
        path: ':id/details',
        component: Details,
      },
    ],
  },
];
