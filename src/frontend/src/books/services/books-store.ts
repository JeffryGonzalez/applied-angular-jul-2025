import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, tap } from 'rxjs';
import { BookApiItem } from '../types';

export const BooksStore = signalStore(
  withEntities<BookApiItem>(),
  withMethods((state) => {
    const http = inject(HttpClient);
    return {
      _load: rxMethod(
        pipe(
          exhaustMap(() =>
            http
              .get<BookApiItem[]>('/api/books')
              .pipe(tap((r) => patchState(state, setEntities(r)))),
          ),
        ),
      ),
    };
  }),
  withComputed((store) => {
    return {
      bookCount: computed(() => store.entities().length),
      earliestYear: computed(() => {
        return store
          .entities()
          .map((b) => b.year)
          .sort()[0];
      }),
      mostRecentYear: computed(() => {
        const sortedByYear = store
          .entities()
          .map((b) => b.year)
          .sort();
        return sortedByYear[sortedByYear.length - 1];
      }),
      averageNumberPages: computed(() => {
        const totalPages = store
          .entities()
          .reduce((prev, curr) => (prev += curr.pages), 0);
        return totalPages > 0
          ? Math.round(totalPages / store.entities().length)
          : null;
      }),
    };
  }),
  withHooks({
    onInit(store) {
      store._load({}); // what is the deal w/ having to pass something in here
    },
  }),
);
