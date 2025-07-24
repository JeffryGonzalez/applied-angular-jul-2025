import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksStore } from '../services/books-store';

@Component({
  selector: 'app-book-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <h1>Book List</h1>
    <ul class="list bg-base-100 rounded-box shadow-md">
      @let books = store.entities();
      <!-- <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
      Most played songs this week
    </li> -->
      @for (book of books; track book.id) {
        <li class="list-row">
          <div>
            <div>
              {{ book.id }}: <span class="font-bold">{{ book.title }}</span> ({{
                book.year
              }})
            </div>
            <div class="text-xs uppercase font-semibold opacity-60">
              {{ book.author }}
            </div>
          </div>
        </li>
      }
    </ul>
  `,
  styles: ``,
})
export class List {
  store = inject(BooksStore);
}
