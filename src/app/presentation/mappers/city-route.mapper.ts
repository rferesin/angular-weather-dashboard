import { ParamMap, Params } from '@angular/router';

import { City } from '../../domain/entities/city';
import { Coordinates } from '../../domain/value-objects/coordinates';

/**
 * Converte City <-> parâmetros de URL.
 * Assim o link /forecast/123?name=... é compartilhável e sobrevive ao F5.
 */
export class CityRouteMapper {
  static toQueryParams(city: City): Params {
    return {
      lat: city.coordinates.latitude,
      lon: city.coordinates.longitude,
      name: city.name,
      country: city.country,
      cc: city.countryCode,
      region: city.region ?? undefined,
      tz: city.timezone,
    };
  }

  static fromRoute(id: string | null, query: ParamMap): City | null {
    const cityId = Number(id);
    const name = query.get('name');
    const country = query.get('country');
    const timezone = query.get('tz');
    const latitude = query.get('lat');
    const longitude = query.get('lon');

    if (!id || !Number.isInteger(cityId) || !name || !country || !timezone) {
      return null;
    }

    if (latitude === null || longitude === null) {
      return null;
    }

    try {
      return new City(
        cityId,
        name,
        country,
        query.get('cc') ?? '',
        query.get('region'),
        new Coordinates(Number(latitude), Number(longitude)),
        timezone,
      );
    } catch {
      return null;
    }
  }
}
