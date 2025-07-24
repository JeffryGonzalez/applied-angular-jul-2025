import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BookApiItem } from '../types';

export class BooksApiService {
  #baseUrl = '/api/books';
  #http = inject(HttpClient);

  getBooks() {
    return this.#http.get<BookApiItem[]>(this.#baseUrl);
  }
}
