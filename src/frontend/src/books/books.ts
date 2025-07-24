import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BooksStore } from './services/book-store';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h3>
      <a routerLink="stats" class="link link-info">Book Stats!</a>
      <router-outlet></router-outlet>
      <!-- <pre>{{ booksResource.value() | json }}</pre> -->
      <!-- {{ store.entities() | json }} -->
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
    </h3>
  `,
  styles: ``,
})
export class Books {
  // booksResource = resource<BookApiItem[], unknown>({
  //   loader: () => fetch('/api/books').then((r) => r.json()),
  // });
  store = inject(BooksStore);
}
