import { TestBed } from '@angular/core/testing';

import { aCity } from '../../../testing/city.factory';
import { City } from '../../domain/entities/city';
import { FavoritesRepository } from '../../domain/repositories/favorites.repository';
import { ToggleFavoriteUseCase } from './toggle-favorite.use-case';

class InMemoryFavoritesRepository extends FavoritesRepository {
  private cities: City[] = [];

  override findAll(): City[] {
    return [...this.cities];
  }

  override saveAll(cities: readonly City[]): void {
    this.cities = [...cities];
  }
}

describe('ToggleFavoriteUseCase', () => {
  let useCase: ToggleFavoriteUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FavoritesRepository, useClass: InMemoryFavoritesRepository }],
    });

    useCase = TestBed.inject(ToggleFavoriteUseCase);
  });

  it('adiciona a cidade quando ela ainda não é favorita', () => {
    const result = useCase.execute(aCity({ id: 1 }));

    expect(result.map((city) => city.id)).toEqual([1]);
  });

  it('remove a cidade quando ela já é favorita', () => {
    useCase.execute(aCity({ id: 1 }));
    useCase.execute(aCity({ id: 2 }));

    const result = useCase.execute(aCity({ id: 1 }));

    expect(result.map((city) => city.id)).toEqual([2]);
  });
});
