import { Routes } from '@angular/router';
import { Books } from './books';
import { StatsComponent } from './components/stats.component';
import { BooksApiService } from './services/books-api.service';
import { BooksStore } from './services/book-store';
import { ListComponent } from './components/list.component';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: Books,
    providers: [BooksApiService, BooksStore],
    children: [
      {
        path: 'stats',
        component: StatsComponent,
        children: [],
      },
      {
        path: 'list',
        component: ListComponent,
        children: [],
      },
    ],
  },
];
