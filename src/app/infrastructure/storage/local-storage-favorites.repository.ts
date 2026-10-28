import { Injectable, inject } from '@angular/core';

import { City } from '../../domain/entities/city';
import { FavoritesRepository } from '../../domain/repositories/favorites.repository';
import { SafeLocalStorage } from './safe-local-storage';
import { StoredCity, StoredCityMapper } from './stored-city.mapper';

/** Implementação da porta `FavoritesRepository` com localStorage. */
@Injectable()
export class LocalStorageFavoritesRepository extends FavoritesRepository {
  private static readonly STORAGE_KEY = 'weather-dashboard:favorites:v1';

  private readonly storage = inject(SafeLocalStorage);

  override findAll(): City[] {
    const raw = this.storage.read(LocalStorageFavoritesRepository.STORAGE_KEY);

    if (!raw) {
      return [];
    }

    try {
      const parsed: unknown = JSON.parse(raw);

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .filter((item): item is StoredCity => StoredCityMapper.isStoredCity(item))
        .map((stored) => StoredCityMapper.toDomain(stored));
    } catch {
      return [];
    }
  }

  override saveAll(cities: readonly City[]): void {
    const payload = JSON.stringify(cities.map((city) => StoredCityMapper.toStored(city)));
    this.storage.write(LocalStorageFavoritesRepository.STORAGE_KEY, payload);
  }
}
