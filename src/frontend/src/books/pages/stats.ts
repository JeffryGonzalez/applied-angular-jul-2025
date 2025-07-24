import {
  Component,
  ChangeDetectionStrategy,
  resource,
  computed,
} from '@angular/core';
import { BookApiItem } from '../types';
import { BceDatePipe } from '../component/bce-date-pipe';

@Component({
  selector: 'app-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BceDatePipe],
  template: `<div class="overflow-x-auto">
    <table class="table">
      <tbody>
        <tr>
          <th>Total Books</th>
          <td>{{ totalBooks() }}</td>
        </tr>
        <tr>
          <th>Oldest Book</th>
          <td>
            {{ oldestBook()! | bcedate }}
          </td>
        </tr>
        <tr>
          <th>Newest Book</th>
          <td>
            {{ newestBook()! | bcedate }}
          </td>
        </tr>
        <tr>
          <th>Average Length</th>
          <td>{{ averageLength() }} pages</td>
        </tr>
      </tbody>
    </table>
  </div>`,
  styles: ``,
})
export class Stats {
  booksResource = resource<BookApiItem[], unknown>({
    loader: () => fetch('/api/books').then((r) => r.json()),
  });

  totalBooks = computed(() => {
    return this.booksResource.value()?.length;
  });

  oldestBook = computed(() => {
    const years = this.booksResource.value()?.map((b) => b.year);
    return Math.min(...years!);
  });

  newestBook = computed(() => {
    const years = this.booksResource.value()?.map((b) => b.year);
    return Math.max(...years!);
  });

  averageLength = computed(() => {
    const lengths = this.booksResource.value()?.map((b) => b.pages);
    const sum = lengths!.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    return Math.floor(sum / lengths!.length);
  });
}

// 1. The total number of books.
// 2. The earliest year a book was published from our list.
// 3. The most recent year a book was published from our list.
// 4. The average number of pages of the books.
