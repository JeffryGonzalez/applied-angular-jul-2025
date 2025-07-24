import { Routes } from '@angular/router';
import { Books } from './books';
import { Prefs } from './pages/prefs';
import { Ui } from './pages/ui';
import { BooksApiService } from './services/books-api';
import { Stats } from './pages/stats';
import { BooksStore } from './services/store';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: Books,
    providers: [BooksApiService, BooksStore],
    children: [
      {
        path: 'prefs',
        component: Prefs,
      },
      {
        path: 'ui',
        component: Ui,
      },
      {
        path: 'stats',
        component: Stats,
      },
    ],
  },
];
