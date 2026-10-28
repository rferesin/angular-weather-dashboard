import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { City } from '../../domain/entities/city';
import { CityRouteMapper } from '../mappers/city-route.mapper';
import { FavoriteButtonComponent } from './favorite-button.component';

/** Componente "burro": recebe dados por input e avisa eventos por output. */
@Component({
  selector: 'app-city-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FavoriteButtonComponent],
  template: `
    <ul class="cities" role="list">
      @for (city of cities(); track city.id) {
        <li class="city">
          <a
            class="city__link"
            [routerLink]="['/forecast', city.id]"
            [queryParams]="queryParamsFor(city)"
          >
            <span class="city__name">{{ city.displayName }}</span>
            <span class="city__country">{{ city.country }}</span>
          </a>
          <app-favorite-button
            [active]="favoriteIds().has(city.id)"
            [label]="favoriteLabel(city)"
            (toggled)="favoriteToggled.emit(city)"
          />
        </li>
      }
    </ul>
  `,
  styles: `
    .cities {
      display: grid;
      gap: 0.5rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .city {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding-right: 0.5rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      background: var(--color-surface);
    }
    .city:hover {
      border-color: var(--color-primary);
    }
    .city__link {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 0.75rem 1rem;
      color: inherit;
      text-decoration: none;
    }
    .city__name {
      font-weight: 600;
    }
    .city__country {
      font-size: 0.85rem;
      color: var(--color-text-muted);
    }
  `,
})
export class CityListComponent {
  readonly cities = input.required<readonly City[]>();
  readonly favoriteIds = input<ReadonlySet<number>>(new Set<number>());
  readonly favoriteToggled = output<City>();

  protected queryParamsFor(city: City) {
    return CityRouteMapper.toQueryParams(city);
  }

  protected favoriteLabel(city: City): string {
    const verb = this.favoriteIds().has(city.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
    return `${verb}: ${city.displayName}, ${city.country}`;
  }
}
