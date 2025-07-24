import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksStore } from '../services/book-store';

@Component({
  selector: 'app-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-title">Average Page Length</div>
        <div class="stat-value">{{ store.averagePageLength() }}</div>
        <div class="stat-desc">Oof thats a alot of reading!</div>
      </div>
    </div>
  `,
  styles: ``,
})
export class StatsComponent {
  store = inject(BooksStore);
}
