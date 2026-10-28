import { Temperature } from '../value-objects/temperature';
import { WeatherCondition } from '../value-objects/weather-condition';

/** Previsão resumida de um único dia. */
export class DailyForecast {
  constructor(
    readonly date: Date,
    readonly condition: WeatherCondition,
    readonly max: Temperature,
    readonly min: Temperature,
    readonly precipitationProbabilityPercent: number,
  ) {}
}
