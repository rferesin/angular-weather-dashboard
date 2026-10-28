import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { City } from '../../domain/entities/city';
import { WeatherReport } from '../../domain/entities/weather-report';
import { WeatherRepository } from '../../domain/repositories/weather.repository';

/** Caso de uso: obter clima atual + previsão dos próximos dias de uma cidade. */
@Injectable({ providedIn: 'root' })
export class GetWeatherReportUseCase {
  private readonly weather = inject(WeatherRepository);

  execute(city: City): Observable<WeatherReport> {
    return this.weather.getReport(city.coordinates);
  }
}
