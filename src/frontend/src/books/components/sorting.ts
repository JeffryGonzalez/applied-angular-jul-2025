import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BooksStore } from '../services/books-store';

@Component({
  selector: 'app-books-sorting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="join">
      @for (opt of store.sortOptions; track opt) {
        <button
          class="btn join-item"
          (click)="store.setSortBy(opt)"
          [disabled]="store.sortedBy() === opt"
        >
          {{ opt }}
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class Sorting {
  store = inject(BooksStore);
}
