import { Observable } from 'rxjs';

import { WeatherReport } from '../entities/weather-report';
import { Coordinates } from '../value-objects/coordinates';

/** Porta: como o domínio espera obter o clima de um local. */
export abstract class WeatherRepository {
  abstract getReport(coordinates: Coordinates): Observable<WeatherReport>;
}
