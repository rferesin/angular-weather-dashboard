import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="search">
      <span class="search__label">Buscar cidade</span>
      <input
        class="search__input"
        type="search"
        autocomplete="off"
        [placeholder]="placeholder()"
        [value]="value()"
        (input)="onInput($event)"
      />
    </label>
  `,
  styles: `
    .search {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }
    .search__label {
      font-size: 0.85rem;
      color: var(--color-text-muted);
    }
    .search__input {
      width: 100%;
      padding: 0.85rem 1rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      background: var(--color-surface);
      color: var(--color-text);
      font: inherit;
      font-size: 1.05rem;
    }
    .search__input:focus-visible {
      outline: 3px solid var(--color-focus);
      outline-offset: 1px;
    }
  `,
})
export class SearchBarComponent {
  readonly value = input('');
  readonly placeholder = input('Ex.: Campinas, Lisboa, Tokyo…');
  readonly queryChange = output<string>();

  protected onInput(event: Event): void {
    this.queryChange.emit((event.target as HTMLInputElement).value);
  }
}
