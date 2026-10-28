import { Pipe, PipeTransform } from '@angular/core';

import { WeatherCategory } from '../../domain/value-objects/weather-condition';

/** Apresentação decide o ícone; o domínio só conhece a categoria. */
@Pipe({ name: 'weatherIcon' })
export class WeatherIconPipe implements PipeTransform {
  transform(category: WeatherCategory, isDay = true): string {
    switch (category) {
      case 'clear':
        return isDay ? '☀️' : '🌙';
      case 'partly-cloudy':
        return isDay ? '⛅' : '☁️';
      case 'cloudy':
        return '☁️';
      case 'fog':
        return '🌫️';
      case 'drizzle':
        return '🌦️';
      case 'rain':
        return '🌧️';
      case 'snow':
        return '❄️';
      case 'thunderstorm':
        return '⛈️';
      default:
        return '🌡️';
    }
  }
}
