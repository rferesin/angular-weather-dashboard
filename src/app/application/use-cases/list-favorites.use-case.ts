import { Injectable, inject } from '@angular/core';

import { City } from '../../domain/entities/city';
import { FavoritesRepository } from '../../domain/repositories/favorites.repository';

/** Caso de uso: listar as cidades favoritas. */
@Injectable({ providedIn: 'root' })
export class ListFavoritesUseCase {
  private readonly favorites = inject(FavoritesRepository);

  execute(): City[] {
    return this.favorites.findAll();
  }
}
