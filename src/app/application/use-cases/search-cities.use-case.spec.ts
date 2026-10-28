import { TestBed } from '@angular/core/testing';
import { Observable, firstValueFrom, of } from 'rxjs';

import { aCity } from '../../../testing/city.factory';
import { City } from '../../domain/entities/city';
import { CityRepository } from '../../domain/repositories/city.repository';
import { SearchCitiesUseCase } from './search-cities.use-case';

class FakeCityRepository extends CityRepository {
  readonly queries: string[] = [];

  override search(query: string): Observable<City[]> {
    this.queries.push(query);
    return of([aCity()]);
  }
}

describe('SearchCitiesUseCase', () => {
  let repository: FakeCityRepository;
  let useCase: SearchCitiesUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CityRepository, useClass: FakeCityRepository }],
    });

    repository = TestBed.inject(CityRepository) as FakeCityRepository;
    useCase = TestBed.inject(SearchCitiesUseCase);
  });

  it('não consulta o repositório quando o texto é curto demais', async () => {
    const result = await firstValueFrom(useCase.execute('  a '));

    expect(result).toEqual([]);
    expect(repository.queries).toHaveLength(0);
  });

  it('remove espaços e delega a busca ao repositório', async () => {
    const result = await firstValueFrom(useCase.execute('  Campinas '));

    expect(result).toHaveLength(1);
    expect(repository.queries).toEqual(['Campinas']);
  });
});
