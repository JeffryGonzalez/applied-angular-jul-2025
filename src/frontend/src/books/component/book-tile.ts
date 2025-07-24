import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { BceDatePipe } from '../component/bce-date-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BceDatePipe, RouterLink],
  template: `<div class="card bg-base-100 w-150 shadow-sm">
    <figure>
      <img src="{{ imageLink() }}" alt="{{ imageLink() }}" />
    </figure>
    <ul class="list rounded-box bg-base-300">
      <li class="list-row mb-2">
        <div>
          <a
            [routerLink]="['..', id(), 'details']"
            class="link text-md font-bold"
            >{{ title() }}</a
          >
          <p class="text-md">{{ author() }}</p>
        </div>
        <div></div>
        <div>
          <div class="badge badge-info m-0.5">
            {{ year()! | bcedate }}
          </div>
          <div class="badge badge-success m-0.5">
            {{ country() }}
          </div>
          <div class="badge badge-accent m-0.5">#{{ id() }}</div>
        </div>
      </li>
    </ul>
  </div>`,
  styles: ``,
})
export class BookTile {
  id = input<string>();
  title = input<string>();
  author = input<string>();
  country = input<string>();
  imageLink = input<string>();
  pages = input<number>();
  year = input<number>();
  language = input<string>();
}
