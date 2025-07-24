import { Routes } from '@angular/router';
import { Books } from './books';
import { BooksStore } from './services/books-store';
import { BooksApiService } from './services/books-api';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: Books,
    providers: [BooksStore, BooksApiService],
    children: [],
  },
];
