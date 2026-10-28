import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { City } from '../../domain/entities/city';
import { CityRepository } from '../../domain/repositories/city.repository';
import { API_CONFIG } from '../config/api.config';
import { GeocodingResponseDto } from './dto/geocoding-response.dto';
import { HttpErrorMapper } from './http-error.mapper';
import { CityMapper } from './mappers/city.mapper';

/** Implementação da porta `CityRepository` usando a Geocoding API da Open-Meteo. */
@Injectable()
export class OpenMeteoCityRepository extends CityRepository {
  private readonly http = inject(HttpClient);
  private readonly config = inject(API_CONFIG);

  override search(query: string): Observable<City[]> {
    const params = new HttpParams()
      .set('name', query)
      .set('count', this.config.maxCitySearchResults)
      .set('language', this.config.language)
      .set('format', 'json');

    return this.http
      .get<GeocodingResponseDto>(`${this.config.geocodingBaseUrl}/search`, { params })
      .pipe(
        map((response) => CityMapper.toDomainList(response)),
        catchError((error: unknown) => throwError(() => HttpErrorMapper.toDomainError(error))),
      );
  }
}
