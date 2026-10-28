import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, map } from 'rxjs';

import { CityNotFoundError } from '../../../domain/errors/domain-errors';
import { CurrentWeatherCardComponent } from '../../components/current-weather-card.component';
import { ErrorMessageComponent } from '../../components/error-message.component';
import { ForecastListComponent } from '../../components/forecast-list.component';
import { SpinnerComponent } from '../../components/spinner.component';
import { CityRouteMapper } from '../../mappers/city-route.mapper';
import { FavoritesStore } from '../../state/favorites.store';
import { ForecastStore } from '../../state/forecast.store';
import { PreferencesStore } from '../../state/preferences.store';

/** Página de detalhe: lê a cidade da URL e delega o carregamento ao ForecastStore. */
@Component({
  selector: 'app-forecast-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    SpinnerComponent,
    ErrorMessageComponent,
    CurrentWeatherCardComponent,
    ForecastListComponent,
  ],
  providers: [ForecastStore],
  templateUrl: './forecast.page.html',
  styleUrl: './forecast.page.scss',
})
export class ForecastPage {
  protected readonly store = inject(ForecastStore);
  protected readonly favorites = inject(FavoritesStore);
  protected readonly preferences = inject(PreferencesStore);

  private readonly route = inject(ActivatedRoute);

  constructor() {
    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .pipe(
        map(([params, query]) => CityRouteMapper.fromRoute(params.get('id'), query)),
        takeUntilDestroyed(),
      )
      .subscribe((city) => {
        if (city) {
          this.store.load(city);
        } else {
          this.store.fail(new CityNotFoundError().userMessage);
        }
      });
  }
}
