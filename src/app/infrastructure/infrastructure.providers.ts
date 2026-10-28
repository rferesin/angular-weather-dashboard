import { Provider } from '@angular/core';

import { CityRepository } from '../domain/repositories/city.repository';
import { FavoritesRepository } from '../domain/repositories/favorites.repository';
import { UserPreferencesRepository } from '../domain/repositories/user-preferences.repository';
import { WeatherRepository } from '../domain/repositories/weather.repository';
import { API_CONFIG, ApiConfig, DEFAULT_API_CONFIG } from './config/api.config';
import { OpenMeteoCityRepository } from './open-meteo/open-meteo-city.repository';
import { OpenMeteoWeatherRepository } from './open-meteo/open-meteo-weather.repository';
import { LocalStorageFavoritesRepository } from './storage/local-storage-favorites.repository';
import { LocalStorageUserPreferencesRepository } from './storage/local-storage-user-preferences.repository';

/**
 * Composition root da infraestrutura: o ÚNICO lugar que liga
 * "porta (abstração do domínio)" -> "adaptador concreto".
 * Para trocar a Open-Meteo por outra API, altere apenas as linhas abaixo.
 */
export function provideInfrastructure(config: ApiConfig = DEFAULT_API_CONFIG): Provider[] {
  return [
    { provide: API_CONFIG, useValue: config },
    { provide: CityRepository, useClass: OpenMeteoCityRepository },
    { provide: WeatherRepository, useClass: OpenMeteoWeatherRepository },
    { provide: FavoritesRepository, useClass: LocalStorageFavoritesRepository },
    { provide: UserPreferencesRepository, useClass: LocalStorageUserPreferencesRepository },
  ];
}
