import { Component, ChangeDetectionStrategy, resource } from '@angular/core';
import { BookApiItem } from './types';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <ul class="list bg-base-100 rounded-box shadow-md">
      @let books = booksResource.value();
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
export class Books {
  booksResource = resource<BookApiItem[], unknown>({
    loader: () => fetch('/api/books').then((r) => r.json()),
  });
}
