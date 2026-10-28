import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { City } from '../../domain/entities/city';
import { CityRepository } from '../../domain/repositories/city.repository';

/** Caso de uso: buscar cidades pelo nome. */
@Injectable({ providedIn: 'root' })
export class SearchCitiesUseCase {
  static readonly MIN_QUERY_LENGTH = 2;

  private readonly cities = inject(CityRepository);

  execute(query: string): Observable<City[]> {
    const normalized = query.trim();

    if (normalized.length < SearchCitiesUseCase.MIN_QUERY_LENGTH) {
      return of([]);
    }

    return this.cities.search(normalized);
  }
}
