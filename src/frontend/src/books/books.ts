import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {} from './services/book-store';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="list">
      <a routerLink="list" class="list link link-info">Book List!</a>
      <a routerLink="stats" class="list link link-info">Book Stats!</a>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class Books {}
