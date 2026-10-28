import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="paginator" aria-label="Paginação dos resultados">
      <button
        type="button"
        class="btn"
        [disabled]="page() <= 1"
        (click)="pageChange.emit(page() - 1)"
      >
        ← Anterior
      </button>
      <span aria-live="polite">Página {{ page() }} de {{ totalPages() }}</span>
      <button
        type="button"
        class="btn"
        [disabled]="page() >= totalPages()"
        (click)="pageChange.emit(page() + 1)"
      >
        Próxima →
      </button>
    </nav>
  `,
  styles: `
    .paginator {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      margin-top: 1rem;
      color: var(--color-text-muted);
      font-size: 0.9rem;
    }
  `,
})
export class PaginatorComponent {
  readonly page = input.required<number>();
  readonly totalPages = input.required<number>();
  readonly pageChange = output<number>();
}
