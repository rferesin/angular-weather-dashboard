import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { CountryOption } from '../../domain/collections/city-collection';

@Component({
  selector: 'app-country-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="filter">
      <span>Filtrar por país</span>
      <select (change)="onChange($event)">
        <option value="" [selected]="selected() === null">Todos</option>
        @for (option of options(); track option.code) {
          <option [value]="option.code" [selected]="option.code === selected()">
            {{ option.name }}
          </option>
        }
      </select>
    </label>
  `,
  styles: `
    .filter {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: var(--color-text-muted);
    }
    select {
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      background: var(--color-surface);
      color: var(--color-text);
      font: inherit;
    }
  `,
})
export class CountryFilterComponent {
  readonly options = input.required<readonly CountryOption[]>();
  readonly selected = input<string | null>(null);
  readonly selectedChange = output<string | null>();

  protected onChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedChange.emit(value === '' ? null : value);
  }
}
