import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksStore } from '../services/book-store';

@Component({
  selector: 'app-books-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Pages</th>
            <th>Year</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          @for (book of store.entities(); track book) {
            <tr>
              <th>{{ book.author }}</th>
              <th>{{ book.title }}</th>
              <th>{{ book.pages }}</th>
              <th>{{ book.year }}</th>
              <th>{{ book.language }}</th>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class ListComponent {
  store = inject(BooksStore);
}
