import { Injectable, inject } from '@angular/core';

import { UserPreferences } from '../../domain/entities/user-preferences';
import { UserPreferencesRepository } from '../../domain/repositories/user-preferences.repository';

/** Caso de uso: salvar as preferências do usuário. */
@Injectable({ providedIn: 'root' })
export class SavePreferencesUseCase {
  private readonly preferences = inject(UserPreferencesRepository);

  execute(preferences: UserPreferences): void {
    this.preferences.save(preferences);
  }
}
