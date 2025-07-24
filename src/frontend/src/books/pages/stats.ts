import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksApiService } from '../services/books-api';

@Component({
  selector: 'app-books-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <h2 class="text-lg font-bold">Stats</h2>
    <p>Total number of books: {{ totalNumberOfBooks() }}</p>
    <p>Earliest year a book was published: {{ earliestYear() }}</p>
    <p>Most recent year a book was published: {{ latestYear() }}</p>
    <p>Average number of pages per book: {{ avgNumberOfPages() }}</p>
  `,
  styles: ``,
})
export class Stats {
  service = inject(BooksApiService);
  books = this.service.getBooksAsSignal();

  totalNumberOfBooks() {
    return this.books()?.length || 0;
  }

  earliestYear() {
    return this.books()
      ? Math.min(...this.books()!.map((book) => book.year))
      : 0;
  }

  latestYear() {
    return this.books()
      ? Math.max(...this.books()!.map((book) => book.year))
      : 0;
  }

  avgNumberOfPages() {
    return this.books()
      ? Math.round(
          this.books()!.reduce((acc, book) => acc + book.pages, 0) /
            this.books()!.length,
        )
      : 0;
  }
}
