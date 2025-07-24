import {
  ChangeDetectionStrategy,
  Component,
  inject,
  resource,
  signal,
} from '@angular/core';
import { FeatureNav } from '../shared/components/feature-nav';
import { BooksStore } from './books.store';
import { BookApiItem } from './types';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeatureNav],
  providers: [BooksStore],
  template: `
    <app-feature-nav [links]="links()" sectionName="Book Store">
    </app-feature-nav>
  `,
  styles: ``,
})
export class Books {
  links = signal([
    { label: 'Book List', href: ['list'] },
    { label: 'Book Stats', href: ['stats'] },
    { label: 'Sort Preferences', href: ['prefs'] },
  ]);

  store = inject(BooksStore);

  booksResource = resource<BookApiItem[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((r) => r.json())
        .then((r) => {
          this.store.setBookList(r);
          return r;
        }),
  });
}
