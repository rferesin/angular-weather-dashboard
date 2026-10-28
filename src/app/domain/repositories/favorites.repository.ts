import { City } from '../entities/city';

/** Porta: persistência da lista de cidades favoritas. */
export abstract class FavoritesRepository {
  abstract findAll(): City[];
  abstract saveAll(cities: readonly City[]): void;
}
