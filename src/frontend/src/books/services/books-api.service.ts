import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BookApiItem } from '../types';

export class BooksApiService {
  #baseUrl = '/api/books';
  #http = inject(HttpClient);

  getBooksAsSignal() {
    return toSignal(this.#http.get(this.#baseUrl));
  }

  getBooks() {
    return this.#http.get<BookApiItem[]>(this.#baseUrl);
  }
}

// export const Books_Handlers = [
//   http.get('/api/books', () => {
//     return HttpResponse.json(books);
//   }),
// ];
