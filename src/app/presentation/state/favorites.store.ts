import { Injectable, computed, inject, signal } from '@angular/core';

import { ListFavoritesUseCase } from '../../application/use-cases/list-favorites.use-case';
import { ToggleFavoriteUseCase } from '../../application/use-cases/toggle-favorite.use-case';
import { City } from '../../domain/entities/city';

/** Estado das cidades favoritas, compartilhado por toda a aplicação. */
@Injectable({ providedIn: 'root' })
export class FavoritesStore {
  private readonly listFavorites = inject(ListFavoritesUseCase);
  private readonly toggleFavorite = inject(ToggleFavoriteUseCase);

  private readonly _cities = signal<readonly City[]>(this.listFavorites.execute());

  readonly cities = this._cities.asReadonly();
  readonly count = computed(() => this._cities().length);
  readonly ids = computed<ReadonlySet<number>>(() => new Set(this._cities().map((city) => city.id)));

  toggle(city: City): void {
    this._cities.set(this.toggleFavorite.execute(city));
  }
}
