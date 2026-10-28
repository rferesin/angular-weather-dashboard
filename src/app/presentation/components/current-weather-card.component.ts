import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { City } from '../../domain/entities/city';
import { CurrentWeather } from '../../domain/entities/current-weather';
import { TemperatureUnit } from '../../domain/value-objects/temperature';
import { DateLabelPipe } from '../pipes/date-label.pipe';
import { TemperaturePipe } from '../pipes/temperature.pipe';
import { WeatherIconPipe } from '../pipes/weather-icon.pipe';
import { FavoriteButtonComponent } from './favorite-button.component';

@Component({
  selector: 'app-current-weather-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FavoriteButtonComponent, TemperaturePipe, WeatherIconPipe, DateLabelPipe],
  template: `
    <article class="card">
      <header class="card__header">
        <div>
          <h1 class="card__city">{{ city().displayName }}</h1>
          <p class="card__country">{{ city().country }}</p>
        </div>
        <app-favorite-button
          [active]="favorite()"
          [label]="favoriteLabel()"
          (toggled)="favoriteToggled.emit()"
        />
      </header>

      <div class="card__main">
        <span class="card__icon" aria-hidden="true">
          {{ current().condition.category | weatherIcon: current().isDay }}
        </span>
        <span class="card__temp">{{ current().temperature | temperature: unit() }}</span>
      </div>
      <p class="card__description">{{ current().condition.description }}</p>

      <dl class="card__details">
        <div>
          <dt>Sensação</dt>
          <dd>{{ current().apparentTemperature | temperature: unit() }}</dd>
        </div>
        <div>
          <dt>Umidade</dt>
          <dd>{{ current().humidityPercent }}%</dd>
        </div>
        <div>
          <dt>Vento</dt>
          <dd>{{ windSpeed() }} km/h</dd>
        </div>
      </dl>

      <p class="card__updated">
        Atualizado às {{ current().observedAt | dateLabel: 'time' }} (horário local da cidade)
      </p>
    </article>
  `,
  styles: `
    .card {
      padding: 1.5rem;
      border: 1px solid var(--color-border);
      border-radius: calc(var(--radius) * 1.5);
      background: var(--color-surface);
      box-shadow: var(--shadow);
    }
    .card__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
    }
    .card__city {
      margin: 0;
      font-size: 1.6rem;
    }
    .card__country {
      margin: 0.15rem 0 0;
      color: var(--color-text-muted);
    }
    .card__main {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 1rem;
    }
    .card__icon {
      font-size: 4rem;
      line-height: 1;
    }
    .card__temp {
      font-size: 3.5rem;
      font-weight: 700;
    }
    .card__description {
      margin: 0.25rem 0 0;
      font-size: 1.1rem;
    }
    .card__details {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
      margin: 1.5rem 0 0;
    }
    .card__details div {
      padding: 0.75rem;
      border-radius: var(--radius);
      background: var(--color-surface-alt);
      text-align: center;
    }
    dt {
      font-size: 0.8rem;
      color: var(--color-text-muted);
    }
    dd {
      margin: 0.2rem 0 0;
      font-weight: 600;
    }
    .card__updated {
      margin: 1rem 0 0;
      font-size: 0.8rem;
      color: var(--color-text-muted);
    }
  `,
})
export class CurrentWeatherCardComponent {
  readonly city = input.required<City>();
  readonly current = input.required<CurrentWeather>();
  readonly unit = input.required<TemperatureUnit>();
  readonly favorite = input(false);
  readonly favoriteToggled = output<void>();

  protected readonly windSpeed = computed(() => Math.round(this.current().windSpeedKmh));

  protected favoriteLabel(): string {
    const verb = this.favorite() ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
    return `${verb}: ${this.city().displayName}`;
  }
}
