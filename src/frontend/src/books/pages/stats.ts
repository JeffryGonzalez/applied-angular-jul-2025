import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksStore } from '../services/books-store';

/*
Requirements for Sprint 2
- The total number of books.
- The earliest year a book was published from our list.
- The most recent year a book was published from our list.
- The average number of pages of the books.
*/

@Component({
  selector: 'app-book-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <h1>Book Statistics</h1>
    <div>
      <span class="pr-2">Total number of books:</span>
      <span>{{ store.bookCount() || 'N/A' }}</span>
    </div>
    <div>
      <span class="pr-2">Oldest book written:</span>
      <span>{{ store.earliestYear() || 'N/A' }}</span>
    </div>
    <div>
      <span class="pr-2">Newest book written:</span>
      <span>{{ store.mostRecentYear() || 'N/A' }}</span>
    </div>
    <div>
      <span class="pr-2">Average pages:</span>
      <span>{{ store.averageNumberPages() || 'N/A' }}</span>
    </div>
  `,
  styles: ``,
})
export class Stats {
  store = inject(BooksStore);
}
