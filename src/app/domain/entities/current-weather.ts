import { Temperature } from '../value-objects/temperature';
import { WeatherCondition } from '../value-objects/weather-condition';

/** Condições meteorológicas no momento da consulta. */
export class CurrentWeather {
  constructor(
    readonly temperature: Temperature,
    readonly apparentTemperature: Temperature,
    readonly humidityPercent: number,
    readonly windSpeedKmh: number,
    readonly condition: WeatherCondition,
    readonly isDay: boolean,
    readonly observedAt: Date,
  ) {}
}
