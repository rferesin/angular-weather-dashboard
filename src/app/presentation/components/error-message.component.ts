import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="error" role="alert">
      <p>{{ message() }}</p>
      <button type="button" class="btn" (click)="retry.emit()">Tentar novamente</button>
    </div>
  `,
  styles: `
    .error {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      padding: 1.5rem;
      text-align: center;
      border: 1px solid var(--color-danger);
      border-radius: var(--radius);
      background: var(--color-surface);
    }
    p {
      margin: 0;
      color: var(--color-danger);
    }
  `,
})
export class ErrorMessageComponent {
  readonly message = input.required<string>();
  readonly retry = output<void>();
}
