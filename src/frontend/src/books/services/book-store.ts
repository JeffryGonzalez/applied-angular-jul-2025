import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { BooksApiService } from './books-api.service';

export const LinksStore = signalStore(withDevtools('books-store'));
withMethods((state) => {
  const service = inject(BooksApiService);

  return {
    loadBooks: () => patchState(state, service.getBooksAsSignal()),
    // service.getBooksAsSignal()
  };

  //add computed stuff here
});
