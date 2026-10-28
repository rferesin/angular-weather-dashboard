import { Coordinates } from '../value-objects/coordinates';
import { CurrentWeather } from './current-weather';
import { DailyForecast } from './daily-forecast';

/** Agregado: tudo o que a aplicação sabe sobre o tempo em um local. */
export class WeatherReport {
  constructor(
    readonly coordinates: Coordinates,
    readonly timezone: string,
    readonly current: CurrentWeather,
    readonly daily: readonly DailyForecast[],
  ) {}

  get today(): DailyForecast | null {
    return this.daily[0] ?? null;
  }

  get hottestDay(): DailyForecast | null {
    return this.daily.reduce<DailyForecast | null>(
      (hottest, day) =>
        hottest === null || day.max.toCelsius() > hottest.max.toCelsius() ? day : hottest,
      null,
    );
  }
}
