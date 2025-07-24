import {
  Component,
  ChangeDetectionStrategy,
  input,
  resource,
  computed,
} from '@angular/core';
import { BookApiItem } from '../types';

@Component({
  selector: 'app-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <table class="table">
      <tbody>
        <tr>
          <th>Title</th>
          <td>{{ book().title }}</td>
        </tr>
        <tr>
          <th>Author</th>
          <td>{{ book().author }}</td>
        </tr>
        <tr>
          <th>Country</th>
          <td>{{ book().country }}</td>
        </tr>
        <tr>
          <th>Image Link</th>
          <td>{{ book().imageLink }}</td>
        </tr>
        <tr>
          <th>Pages</th>
          <td>{{ book().pages }}</td>
        </tr>
        <tr>
          <th>Year</th>
          <td>{{ book().year }}</td>
        </tr>
        <tr>
          <th>Language</th>
          <td>{{ book().language }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: ``,
})
export class Details {
  id = input.required<string>();

  book = computed(() => {
    return this.booksResource.value()!.filter((obj) => obj.id === this.id())[0];
  });

  booksResource = resource<BookApiItem[], unknown>({
    loader: () => fetch('/api/books').then((r) => r.json()),
  });
}
