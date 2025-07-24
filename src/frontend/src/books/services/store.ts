import {
  patchState,
  signalStore,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { BookApiItem } from '../types';

const ValidSortOptions = ['title', 'author', 'year'] as const;

export type SortOptions = (typeof ValidSortOptions)[number];

type SortOrder = {
  field: SortOptions;
};

export const BooksStore = signalStore(
  withState<SortOrder>({
    field: 'title',
  }),
  withMethods((store) => {
    return {
      setSortOrder: (field: SortOptions) => patchState(store, { field }),
      getSortOrder: () => store.field(),
      sortedBooks: (books: BookApiItem[]) => {
        const sortField = store.field();
        if (!books) return [];
        return [...books].sort((a, b) => {
          if (sortField === 'year') {
            return a.year - b.year;
          }
          return a[sortField].localeCompare(b[sortField]);
        });
      },
    };
  }),
  withProps(() => {
    return {
      sortOptions: ValidSortOptions,
    };
  }),
);
