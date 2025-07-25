import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { BookApiItem } from '../types';

export type BooksState = {
  books: BookApiItem[];
  isLoading: boolean;
};

const initialState: BooksState = {
  books: [],
  isLoading: false,
};

export const BooksStore = signalStore(
  withState(() => initialState),
  withMethods((store) => {
    const http = inject(HttpClient);

    return {
      async _loadBooks(): Promise<void> {
        patchState(store, { isLoading: true });

        const books = await firstValueFrom(
          http.get<BookApiItem[]>('/api/books'),
        );

        patchState(store, { books, isLoading: false });
      },
    };
  }),
  withComputed((store) => {
    return {
      bookCount: computed(() => store.books().length),
      earliestYear: computed(() => {
        return store
          .books()
          .map((b) => b.year)
          .sort()[0];
      }),
      mostRecentYear: computed(() => {
        const sortedByYear = store
          .books()
          .map((b) => b.year)
          .sort();
        return sortedByYear[sortedByYear.length - 1];
      }),
      averageNumberPages: computed(() => {
        const totalPages = store
          .books()
          .reduce((prev, curr) => (prev += curr.pages), 0);
        return totalPages > 0
          ? Math.round(totalPages / store.books().length)
          : null;
      }),
    };
  }),
  withHooks({
    onInit(store) {
      store._loadBooks();
    },
  }),
);
