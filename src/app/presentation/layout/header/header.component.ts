import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PreferencesStore } from '../../state/preferences.store';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <header class="header">
      <a routerLink="/" class="brand">🌤️ Weather<span>Dash</span></a>

      <div class="actions">
        <div class="segmented" role="group" aria-label="Unidade de temperatura">
          <button
            type="button"
            [class.is-active]="preferences.unit() === 'celsius'"
            [attr.aria-pressed]="preferences.unit() === 'celsius'"
            (click)="preferences.setUnit('celsius')"
          >
            °C
          </button>
          <button
            type="button"
            [class.is-active]="preferences.unit() === 'fahrenheit'"
            [attr.aria-pressed]="preferences.unit() === 'fahrenheit'"
            (click)="preferences.setUnit('fahrenheit')"
          >
            °F
          </button>
        </div>

        <button
          type="button"
          class="icon-button"
          [attr.aria-label]="preferences.theme() === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'"
          (click)="preferences.toggleTheme()"
        >
          {{ preferences.theme() === 'dark' ? '☀️' : '🌙' }}
        </button>
      </div>
    </header>
  `,
  styles: `
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem 0;
    }
    .brand {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-text);
      text-decoration: none;
    }
    .brand span {
      color: var(--color-primary);
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .segmented {
      display: inline-flex;
      overflow: hidden;
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
    }
    .segmented button {
      padding: 0.45rem 0.8rem;
      border: 0;
      background: var(--color-surface);
      color: var(--color-text);
      font: inherit;
      cursor: pointer;
    }
    .segmented button.is-active {
      background: var(--color-primary);
      color: var(--color-primary-contrast);
    }
    .icon-button {
      width: 2.5rem;
      height: 2.5rem;
      border: 1px solid var(--color-border);
      border-radius: 50%;
      background: var(--color-surface);
      font-size: 1.1rem;
      cursor: pointer;
    }
  `,
})
export class HeaderComponent {
  protected readonly preferences = inject(PreferencesStore);
}
