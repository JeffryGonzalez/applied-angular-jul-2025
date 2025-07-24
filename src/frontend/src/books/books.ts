import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeatureNav, FeatureNavLink } from '../shared/components/feature-nav';
import { BooksStore } from './services/books-store';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeatureNav],
  providers: [BooksStore],
  template: `
    <app-feature-nav [links]="bookLinks" sectionName="Links">
      <!-- @if (isLoggedIn() === false) {
        <p>You must be logged in to see the preferences link or add links</p>
      } -->
    </app-feature-nav>
  `,
  styles: ``,
})
export class Books {
  bookLinks: FeatureNavLink[] = [
    { href: ['/books'], label: 'List' },
    { href: ['stats'], label: 'Stats' },
  ];
}
