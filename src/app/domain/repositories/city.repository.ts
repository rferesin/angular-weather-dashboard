import { Observable } from 'rxjs';

import { City } from '../entities/city';

/** Porta: como o domínio espera buscar cidades. A implementação fica na infraestrutura. */
export abstract class CityRepository {
  abstract search(query: string): Observable<City[]>;
}
