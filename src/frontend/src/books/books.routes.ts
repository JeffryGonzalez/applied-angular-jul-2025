import { Routes } from '@angular/router';
import { Books } from './books';
import { StatsComponent } from './components/stats.component';
import { BooksApiService } from './services/books-api.service';
import { BooksStore } from './services/book-store';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: Books,
    providers: [BooksApiService, BooksStore],
    children: [],
  },
  {
    path: 'stats',
    component: StatsComponent,
    children: [],
  },
];
