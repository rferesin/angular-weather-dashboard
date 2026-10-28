import { Injectable, inject } from '@angular/core';

import { City } from '../../domain/entities/city';
import { FavoritesRepository } from '../../domain/repositories/favorites.repository';

/** Caso de uso: favoritar ou desfavoritar uma cidade. Devolve a lista atualizada. */
@Injectable({ providedIn: 'root' })
export class ToggleFavoriteUseCase {
  private readonly favorites = inject(FavoritesRepository);

  execute(city: City): City[] {
    const current = this.favorites.findAll();
    const alreadyFavorite = current.some((favorite) => favorite.equals(city));

    const updated = alreadyFavorite
      ? current.filter((favorite) => !favorite.equals(city))
      : [...current, city];

    this.favorites.saveAll(updated);
    return updated;
  }
}
