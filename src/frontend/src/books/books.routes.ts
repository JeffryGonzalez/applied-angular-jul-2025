import { Routes } from '@angular/router';
import { Books } from './books';
import { StatsComponent } from './components/stats.component';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: Books,
    children: [],
  },
  {
    path: 'stats',
    component: StatsComponent,
    children: [],
  },
];
