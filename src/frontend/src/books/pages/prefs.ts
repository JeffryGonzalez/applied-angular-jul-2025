import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { BooksStore } from '../books.store';

@Component({
  selector: 'app-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `<div>
      <p class="text-md font-bold">Order Books By</p>
    </div>
    <ul>
      @for (option of sortOptions(); track option) {
        <li class="list-row mb-2">
          <div></div>
          <div>
            <button
              [disabled]="bookStore.orderBy() === option"
              class="btn btn-wide mr-2"
              (click)="bookStore.setOrderBy(option)"
            >
              {{ option }}
            </button>
          </div>
        </li>
      }
    </ul>`,
  styles: ``,
})
export class Prefs {
  sortOptions = signal(['title', 'author', 'year']);
  bookStore = inject(BooksStore);
}
