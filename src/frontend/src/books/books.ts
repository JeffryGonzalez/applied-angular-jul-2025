import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="flex flex-row gap-4">
      <a routerLink="ui" class="link">UI</a>
      <a routerLink="stats" class="link">Stats</a>
      <a routerLink="prefs" class="link">Prefs</a>
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class Books {}
