import {
  ChangeDetectionStrategy,
  Component,
  computed,
  resource,
  signal,
} from '@angular/core';
import { BookApiItem } from './types';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (booksResource.isLoading()) {
      <div class="loading-ball loading"></div>
    } @else {
      <form class="filter">
        <input
          (click)="setFiltersNull()"
          class="btn btn-square"
          type="reset"
          value="×"
        />
        <details class="dropdown">
          <summary class="btn m-1">Authors</summary>
          <ul
            class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            @for (author of authors(); track author) {
              @if (author === filterAuthor() || !filterAuthor()) {
                <li>
                  <input
                    (click)="filterAuthor.set(author)"
                    class="btn"
                    type="radio"
                    name="filter"
                    [attr.aria-label]="author"
                  />
                </li>
              }
            }
          </ul>
        </details>
        <details class="dropdown">
          <summary class="btn m-1">Titles</summary>
          <ul
            class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            @for (title of titles(); track title) {
              @if (title === filterTitle() || !filterTitle()) {
                <li>
                  <input
                    (click)="filterTitle.set(title)"
                    class="btn"
                    type="radio"
                    name="filter"
                    [attr.aria-label]="title"
                  />
                </li>
              }
            }
          </ul>
        </details>
        <details class="dropdown">
          <summary class="btn m-1">Years</summary>
          <ul
            class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            @for (year of years(); track year) {
              @if (year === filterYear() || !filterYear()) {
                <li>
                  <input
                    (click)="filterYear.set(year)"
                    class="btn"
                    type="radio"
                    name="filter"
                    [attr.aria-label]="year"
                  />
                </li>
              }
            }
          </ul>
        </details>
      </form>
    }
    @if (booksResource.hasValue()) {
      <ul class="list rounded-box bg-base-300">
        @for (book of booksResource.value(); track book.id) {
          <li class="list-row mb-2">
            <div>
              <p class="text-md font-bold">{{ book.title }}</p>
              <a class="link" [href]="book.link" target="_blank">{{
                book.link
              }}</a>
            </div>
            <div></div>
            <div>
              <p align="right" class="text-md">{{ book.author }}</p>
              <p align="right" class="text-md">{{ book.year }}</p>
            </div>
          </li>
        } @empty {
          <p>Sorry, no Books! Maybe add some?</p>
        }
      </ul>
    }
  `,
  styles: ``,
})
export class Books {
  filterAuthor = signal<string | null>(null);
  filterTitle = signal<string | null>(null);
  filterYear = signal<number | null>(null);

  booksResource = resource<BookApiItem[], unknown>({
    loader: () => fetch('/api/books').then((r) => r.json()),
  });

  filteredBooksByAuthor = computed(() => {
    const author = this.filterAuthor();
    if (author === null) return this.booksResource.value();
    return (this.booksResource.value() || []).filter((book) =>
      book.author.includes(author),
    );
  });

  setFiltersNull() {
    this.filterAuthor.set(null);
    this.filterTitle.set(null);
    this.filterYear.set(null);
  }

  filteredBooksByTitle = computed(() => {
    const title = this.filterTitle();
    if (title === null) return this.booksResource.value();
    return (this.booksResource.value() || []).filter((book) =>
      book.title.includes(title),
    );
  });

  filteredBooksByYear = computed(() => {
    const year = this.filterYear();
    if (year === null) return this.booksResource.value();
    return (this.booksResource.value() || []).filter(
      (book) => book.year === year,
    );
  });

  authors = computed(() => {
    const books = this.booksResource.value() || [];
    const allAuthors = new Set<string>();
    books.forEach((books) => allAuthors.add(books.author));
    return Array.from(allAuthors);
  });

  titles = computed(() => {
    const books = this.booksResource.value() || [];
    const allTitles = new Set<string>();
    books.forEach((books) => allTitles.add(books.title));
    return Array.from(allTitles);
  });

  years = computed(() => {
    const books = this.booksResource.value() || [];
    const allYears = new Set<number>();
    books.forEach((books) => allYears.add(books.year));
    return Array.from(allYears);
  });
}
