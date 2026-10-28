import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { WeatherReport } from '../../domain/entities/weather-report';
import { WeatherRepository } from '../../domain/repositories/weather.repository';
import { Coordinates } from '../../domain/value-objects/coordinates';
import { API_CONFIG } from '../config/api.config';
import { ForecastResponseDto } from './dto/forecast-response.dto';
import { HttpErrorMapper } from './http-error.mapper';
import { WeatherReportMapper } from './mappers/weather-report.mapper';

/** Implementação da porta `WeatherRepository` usando a Forecast API da Open-Meteo. */
@Injectable()
export class OpenMeteoWeatherRepository extends WeatherRepository {
  private static readonly CURRENT_FIELDS = [
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'weather_code',
    'wind_speed_10m',
    'is_day',
  ].join(',');

  private static readonly DAILY_FIELDS = [
    'weather_code',
    'temperature_2m_max',
    'temperature_2m_min',
    'precipitation_probability_max',
  ].join(',');

  private readonly http = inject(HttpClient);
  private readonly config = inject(API_CONFIG);

  override getReport(coordinates: Coordinates): Observable<WeatherReport> {
    const params = new HttpParams()
      .set('latitude', coordinates.latitude)
      .set('longitude', coordinates.longitude)
      .set('current', OpenMeteoWeatherRepository.CURRENT_FIELDS)
      .set('daily', OpenMeteoWeatherRepository.DAILY_FIELDS)
      .set('timezone', 'auto')
      .set('forecast_days', this.config.forecastDays);

    return this.http
      .get<ForecastResponseDto>(`${this.config.forecastBaseUrl}/forecast`, { params })
      .pipe(
        map((response) => WeatherReportMapper.toDomain(response)),
        catchError((error: unknown) => throwError(() => HttpErrorMapper.toDomainError(error))),
      );
  }
}
