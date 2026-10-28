import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section class="not-found">
      <h1>404</h1>
      <p>Página não encontrada.</p>
      <a routerLink="/" class="btn">Voltar para o início</a>
    </section>
  `,
  styles: `
    .not-found {
      padding: 4rem 0;
      text-align: center;
    }
    h1 {
      margin: 0;
      font-size: 4rem;
    }
    p {
      color: var(--color-text-muted);
    }
  `,
})
export class NotFoundPage {}
