import { City } from '../../domain/entities/city';
import { Coordinates } from '../../domain/value-objects/coordinates';

/** Formato salvo no localStorage (independente da classe City). */
export interface StoredCity {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  region: string | null;
  latitude: number;
  longitude: number;
  timezone: string;
}

export class StoredCityMapper {
  static toStored(city: City): StoredCity {
    return {
      id: city.id,
      name: city.name,
      country: city.country,
      countryCode: city.countryCode,
      region: city.region,
      latitude: city.coordinates.latitude,
      longitude: city.coordinates.longitude,
      timezone: city.timezone,
    };
  }

  static toDomain(stored: StoredCity): City {
    return new City(
      stored.id,
      stored.name,
      stored.country,
      stored.countryCode,
      stored.region,
      new Coordinates(stored.latitude, stored.longitude),
      stored.timezone,
    );
  }

  /** Valida dados vindos do localStorage (que podem ter sido alterados à mão). */
  static isStoredCity(value: unknown): value is StoredCity {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const candidate = value as Record<string, unknown>;

    return (
      typeof candidate['id'] === 'number' &&
      typeof candidate['name'] === 'string' &&
      typeof candidate['country'] === 'string' &&
      typeof candidate['countryCode'] === 'string' &&
      (typeof candidate['region'] === 'string' || candidate['region'] === null) &&
      typeof candidate['latitude'] === 'number' &&
      typeof candidate['longitude'] === 'number' &&
      typeof candidate['timezone'] === 'string'
    );
  }
}
