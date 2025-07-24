import { JsonPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, resource } from '@angular/core';
import { BookApiItem } from './types';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe, RouterOutlet, RouterLink],
  template: `
    <h3>
      <a routerLink="stats" class="link link-info">Book Stats!</a>
      <router-outlet></router-outlet>
      <pre>{{ booksResource.value() | json }}</pre>
    </h3>
  `,
  styles: ``,
})
export class Books {
  booksResource = resource<BookApiItem[], unknown>({
    loader: () => fetch('/api/books').then((r) => r.json()),
  });
}
