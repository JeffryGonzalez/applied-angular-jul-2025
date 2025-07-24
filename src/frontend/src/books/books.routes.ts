import { Routes } from '@angular/router';
import { Books } from './books';
import { List } from './pages/list';
import { Stats } from './pages/stats';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: Books,
    children: [
      { path: '', component: List },
      { path: 'stats', component: Stats },
    ],
  },
];
