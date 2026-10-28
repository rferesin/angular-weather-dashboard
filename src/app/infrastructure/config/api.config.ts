import { InjectionToken } from '@angular/core';

export interface ApiConfig {
  readonly geocodingBaseUrl: string;
  readonly forecastBaseUrl: string;
  readonly language: string;
  readonly forecastDays: number;
  readonly maxCitySearchResults: number;
}

/** Token de injeção: permite trocar a configuração (ex.: testes ou outro ambiente). */
export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');

/** Open-Meteo é gratuita para uso não comercial e não exige chave de API. */
export const DEFAULT_API_CONFIG: ApiConfig = {
  geocodingBaseUrl: 'https://geocoding-api.open-meteo.com/v1',
  forecastBaseUrl: 'https://api.open-meteo.com/v1',
  language: 'pt',
  forecastDays: 7,
  maxCitySearchResults: 30,
};
