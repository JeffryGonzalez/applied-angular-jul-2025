import {
  patchState,
  signalStoreFeature,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

export type SortOption = 'title' | 'author' | 'year';
const sortOptions = ['title', 'author', 'year'] as const;

type SortingState = {
  sortedBy: SortOption;
  order: 'asc' | 'desc';
};

export function withBookSorting() {
  return signalStoreFeature(
    withState<SortingState>({
      sortedBy: 'title',
      order: 'asc',
    }),
    withProps(() => ({
      sortOptions,
    })),
    withMethods((store) => {
      return {
        setSortBy: (option: SortOption) =>
          patchState(store, {
            sortedBy: sortOptions.includes(option) ? option : 'title',
          }),
      };
    }),
  );
}
