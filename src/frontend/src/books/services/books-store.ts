import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { BookApiItem } from '../types';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, tap } from 'rxjs';
import { computed, inject } from '@angular/core';
import { BooksApiService } from './books-api';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import books from '../../mocks/books';
import { Books } from '../books';

type BooksState = {
  sortedBy: string;
};

export const BooksStore = signalStore(
  withEntities<BookApiItem>(),
  withDevtools('books-store'),
  withState<BooksState>({
    sortedBy: 'Id',
  }),
  withMethods((state) => {
    const service = inject(BooksApiService);
    return {
      _load: rxMethod<{ isBackgroundFetch: boolean }>(
        pipe(
          tap(() => patchState(state)),
          exhaustMap(() =>
            service
              .getBooks()
              .pipe(tap((r) => patchState(state, setEntities(r)))),
          ),
        ),
      ),
      changeSortOrder: (sortedBy: string) => {
        patchState(state, { sortedBy: sortedBy });
        //const sortedBooks = store;
        // return books.sort((a, b) => {
        //   const a = a[sortedBy];
        //   const b = b[sortedBy];
        // } )
      },
    };
  }),
  withComputed((store) => {
    return {
      sortedBooks: computed(() => {
        const sortOrder = store.sortedBy();
        const books = store.entities();
        switch (sortOrder.toLocaleLowerCase()) {
          case 'author':
            return books.sort((a, b) => a.author.localeCompare(b.author));
          case 'country':
            return books.sort((a, b) => a.country.localeCompare(b.country));
          case 'title':
            return books.sort((a, b) => a.title.localeCompare(b.title));
          case 'pages':
            return books.sort((a, b) => a.pages - b.pages);
          case 'year':
            return books.sort((a, b) => a.year - b.year);
          case 'language':
            return books.sort((a, b) => a.language.localeCompare(b.language));
          default:
            return books.sort(
              (a, b) =>
                (a.id as unknown as number) - (b.id as unknown as number),
            );
        }
      }),
    };
  }),

  withHooks({
    onInit(store) {
      store._load({ isBackgroundFetch: false });
      console.log('Books Store is Created');
      store.changeSortOrder(store.sortedBy());
    },
  }),
);

function mapSortedBooksApitItem(
  books: BookApiItem,
  sortedValue: string,
): BookApiItem {
  return { ...books };
}
