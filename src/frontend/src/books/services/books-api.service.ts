import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Books } from '../books';
import { toSignal } from '@angular/core/rxjs-interop';

export class BooksApiService {
  #baseUrl = '/api/books';
  #http = inject(HttpClient);

  getBooksAsSignal() {
    return toSignal(this.#http.get<Books>(this.#baseUrl));
  }
}

// export const Books_Handlers = [
//   http.get('/api/books', () => {
//     return HttpResponse.json(books);
//   }),
// ];
