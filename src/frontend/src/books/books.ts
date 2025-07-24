import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BooksStore } from './services/book-store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, JsonPipe],
  template: `
    <h3>
      <a routerLink="stats" class="link link-info">Book Stats!</a>
      <router-outlet></router-outlet>
      <!-- <pre>{{ booksResource.value() | json }}</pre> -->
      {{ store.entities() | json }}
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
