import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BookApiItem } from '../types';
import { toSignal } from '@angular/core/rxjs-interop';

export class BooksApiService {
  #url = '/api/books';
  #http = inject(HttpClient);

  getBooksAsSignal() {
    return toSignal(this.#http.get<BookApiItem[]>(this.#url));
  }
}
