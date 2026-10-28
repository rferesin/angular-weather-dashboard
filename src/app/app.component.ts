import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './presentation/layout/header/header.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="container">
      <app-header />
      <main>
        <router-outlet />
      </main>
      <footer class="footer">
        Dados meteorológicos por
        <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo.com</a>
        (CC BY 4.0)
      </footer>
    </div>
  `,
  styles: `
    main {
      min-height: 60vh;
    }
    .footer {
      margin-top: 3rem;
      padding: 1.5rem 0;
      border-top: 1px solid var(--color-border);
      color: var(--color-text-muted);
      font-size: 0.85rem;
      text-align: center;
    }
    .footer a {
      color: var(--color-primary);
    }
  `,
})
export class AppComponent {}
