import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="fav"
      [class.fav--active]="active()"
      [attr.aria-pressed]="active()"
      [attr.aria-label]="label()"
      [attr.title]="label()"
      (click)="toggled.emit()"
    >
      {{ active() ? '★' : '☆' }}
    </button>
  `,
  styles: `
    .fav {
      width: 2.5rem;
      height: 2.5rem;
      border: 0;
      border-radius: 50%;
      background: transparent;
      color: var(--color-text-muted);
      font-size: 1.4rem;
      cursor: pointer;
      transition: transform 0.15s ease;
    }
    .fav:hover {
      transform: scale(1.15);
    }
    .fav--active {
      color: var(--color-star);
    }
  `,
})
export class FavoriteButtonComponent {
  readonly active = input.required<boolean>();
  readonly label = input.required<string>();
  readonly toggled = output<void>();
}
