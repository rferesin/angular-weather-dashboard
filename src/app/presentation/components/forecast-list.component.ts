import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { DailyForecast } from '../../domain/entities/daily-forecast';
import { TemperatureUnit } from '../../domain/value-objects/temperature';
import { DateLabelPipe } from '../pipes/date-label.pipe';
import { TemperaturePipe } from '../pipes/temperature.pipe';
import { WeatherIconPipe } from '../pipes/weather-icon.pipe';

@Component({
  selector: 'app-forecast-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TemperaturePipe, WeatherIconPipe, DateLabelPipe],
  template: `
    <section aria-labelledby="forecast-title">
      <h2 id="forecast-title">Próximos dias</h2>
      <ul class="days" role="list">
        @for (day of days(); track day.date.getTime()) {
          <li class="day">
            <span class="day__label">{{ day.date | dateLabel: 'day' }}</span>
            <span class="day__icon" aria-hidden="true">{{ day.condition.category | weatherIcon }}</span>
            <span class="day__description">{{ day.condition.description }}</span>
            <span class="day__temps">
              <strong>{{ day.max | temperature: unit() }}</strong>
              <span class="day__min">{{ day.min | temperature: unit() }}</span>
            </span>
            <span class="day__rain" title="Probabilidade de chuva">
              💧 {{ day.precipitationProbabilityPercent }}%
            </span>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    h2 {
      margin: 2rem 0 0.75rem;
      font-size: 1.2rem;
    }
    .days {
      display: grid;
      gap: 0.5rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .day {
      display: grid;
      grid-template-columns: 6.5rem 2rem 1fr auto auto;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      background: var(--color-surface);
    }
    .day__label {
      font-weight: 600;
      text-transform: capitalize;
    }
    .day__icon {
      font-size: 1.5rem;
    }
    .day__description,
    .day__min,
    .day__rain {
      color: var(--color-text-muted);
    }
    .day__temps {
      display: inline-flex;
      gap: 0.5rem;
    }
    .day__rain {
      min-width: 3.5rem;
      text-align: right;
      font-size: 0.9rem;
    }
    @media (max-width: 600px) {
      .day {
        grid-template-columns: 1fr auto;
      }
      .day__description {
        display: none;
      }
    }
  `,
})
export class ForecastListComponent {
  readonly days = input.required<readonly DailyForecast[]>();
  readonly unit = input.required<TemperatureUnit>();
}
