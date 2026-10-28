import { InvalidCoordinatesError } from '../errors/domain-errors';

/** Value Object: par latitude/longitude sempre válido. */
export class Coordinates {
  constructor(
    readonly latitude: number,
    readonly longitude: number,
  ) {
    const validLatitude = Number.isFinite(latitude) && latitude >= -90 && latitude <= 90;
    const validLongitude = Number.isFinite(longitude) && longitude >= -180 && longitude <= 180;

    if (!validLatitude || !validLongitude) {
      throw new InvalidCoordinatesError(latitude, longitude);
    }
  }
}
