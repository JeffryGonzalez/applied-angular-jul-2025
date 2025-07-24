import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksStore } from '../services/books-store';

@Component({
  selector: 'app-books-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <!-- head -->
        <thead>
          <tr>
            @for (name of ColumnNames; track name) {
              <th (click)="sortBy(name)">{{ name }}</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (book of store.sortedBooks(); track book) {
            <tr>
              <th>{{ book.id }}</th>
              <td>{{ book.author }}</td>
              <td>{{ book.country }}</td>
              <td>{{ book.imageLink }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.pages }}</td>
              <td>{{ book.year }}</td>
              <td>{{ book.language }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class BooksTableComponent {
  store = inject(BooksStore);
  ColumnNames: string[] = [
    'Id',
    'Author',
    'Country',
    'Image Link',
    'Title',
    'Pages',
    'Year',
    'Language',
  ];

  sortBy(column: string) {
    if (column != this.store.sortedBy()) {
      this.store.changeSortOrder(column);
    }
  }
}
