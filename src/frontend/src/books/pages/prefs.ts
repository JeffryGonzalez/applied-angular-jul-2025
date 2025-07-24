import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BooksStore } from '../services/store';

@Component({
  selector: 'app-books-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <h2 class="text-lg font-bold">Prefs</h2>
    <div class="flex flex-row gap-4">
      @for (option of store.sortOptions; track $index) {
        <button
          class="btn btn-accent"
          [disabled]="store.getSortOrder() === option"
          (click)="store.setSortOrder(option)"
        >
          {{ option }}
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class Prefs {
  store = inject(BooksStore);
}
