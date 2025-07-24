import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { BooksStore } from '../books.store';
import { BookTile } from '../component/book-tile';

@Component({
  selector: 'app-book-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BookTile],
  template: `
    @for (book of orderedBooks(); track book.id) {
      <app-book-tile
        [id]="book.id"
        [author]="book.author"
        [country]="book.country"
        [imageLink]="book.imageLink"
        [title]="book.title"
        [pages]="book.pages"
        [year]="book.year"
        [language]="book.language"
      />
    }
  `,
  styles: ``,
})
export class List {
  store = inject(BooksStore);

  orderedBooks = computed(() => {
    switch (this.store.orderBy()) {
      case 'title':
        return this.store
          .bookList()
          .sort((a, b) => a.title.localeCompare(b.title));
      case 'author':
        return this.store
          .bookList()
          .sort((a, b) => a.author.localeCompare(b.author));
      case 'year':
        return this.store.bookList().sort((a, b) => a.year - b.year);
      default:
        return this.store
          .bookList()
          .sort((a, b) => a.title.localeCompare(b.title));
    }
  });
}
