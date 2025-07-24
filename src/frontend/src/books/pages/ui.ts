import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BooksApiService } from '../services/books-api';
import { BooksStore } from '../services/store';

@Component({
  selector: 'app-books-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `<div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Author</th>
          <th>Year Published</th>
        </tr>
      </thead>
      <tbody>
        @for (book of store.sortedBooks(books() ?? []); track book.id) {
          <tr>
            <th>{{ book.id }}</th>
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.year }}</td>
          </tr>
        }
      </tbody>
    </table>
  </div>`,
  styles: ``,
})
export class Ui {
  service = inject(BooksApiService);
  store = inject(BooksStore);
  books = this.service.getBooksAsSignal();
}
