import { City } from '../app/domain/entities/city';
import { Coordinates } from '../app/domain/value-objects/coordinates';

interface CityOverrides {
  id?: number;
  name?: string;
  country?: string;
  countryCode?: string;
  region?: string | null;
  latitude?: number;
  longitude?: number;
  timezone?: string;
}

/** Test Data Builder: cria uma City válida e permite sobrescrever só o que importa no teste. */
export function aCity(overrides: CityOverrides = {}): City {
  const data = {
    id: 3467865,
    name: 'Campinas',
    country: 'Brasil',
    countryCode: 'BR',
    region: 'São Paulo' as string | null,
    latitude: -22.90556,
    longitude: -47.06083,
    timezone: 'America/Sao_Paulo',
    ...overrides,
  };

  return new City(
    data.id,
    data.name,
    data.country,
    data.countryCode,
    data.region,
    new Coordinates(data.latitude, data.longitude),
    data.timezone,
  );
}
