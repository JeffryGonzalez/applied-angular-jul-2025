// book store, ha
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { BookApiItem } from './types';

type BookListState = {
  orderBy: string;
  bookList: BookApiItem[];
};

export const BooksStore = signalStore(
  withState<BookListState>({
    orderBy: 'title',
    bookList: [],
  }),
  withMethods((store) => {
    return {
      setOrderBy: (orderBy: string) => patchState(store, { orderBy }),
      setBookList: (bookList: BookApiItem[]) => patchState(store, { bookList }),
    };
  }),
);
