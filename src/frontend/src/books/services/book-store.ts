import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { BooksApiService } from './books-api.service';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { BookApiItem } from '../types';
import { exhaustMap, pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

export const BooksStore = signalStore(
  withDevtools('books-store'),
  withEntities<BookApiItem>(),
  withMethods((state) => {
    const service = inject(BooksApiService);

    return {
      loadBooks: rxMethod<void>(
        pipe(
          exhaustMap(() =>
            service.getBooks().pipe(
              tap((b) => {
                console.log('getting books', b);
                patchState(state, setEntities(b));
              }),
            ),
          ),
        ),
      ),
    };
  }),

  withComputed((store) => {
    return {
      averagePageLength: computed(() => {
        const books = store.entities();
        const averagePages = books.reduce((acc, book, index, array) => {
          acc += book.pages;
          if (index === array.length - 1) {
            return acc / array.length;
          }
          return acc;
        }, 0);

        return averagePages;
      }),
    };
  }),
  withHooks({
    onInit(store) {
      console.log('loading books');
      store.loadBooks();
    },
  }),
);
