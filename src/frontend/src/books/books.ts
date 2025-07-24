import {
  Component,
  ChangeDetectionStrategy,
  resource,
  inject,
} from '@angular/core';
import { BooksStore } from './services/books-store';
import { BooksTableComponent } from './components/books-table';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BooksTableComponent],
  template: `
    <div>
      <p>The Number of books are: {{ store.entities().length }}</p>
      <p>You are Ordering by: {{ store.sortedBy() }}</p>
    </div>
    <app-books-table />
  `,
  styles: ``,
})
export class Books {
  store = inject(BooksStore);
  // booksResource = resource<BookApiItem[], unknown>({
  //   loader: () => fetch('/api/books').then((r) => r.json()),
  // });
}
