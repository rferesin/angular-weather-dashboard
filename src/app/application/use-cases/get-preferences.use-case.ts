import { Injectable, inject } from '@angular/core';

import { UserPreferences } from '../../domain/entities/user-preferences';
import { UserPreferencesRepository } from '../../domain/repositories/user-preferences.repository';

/** Caso de uso: carregar as preferências do usuário. */
@Injectable({ providedIn: 'root' })
export class GetPreferencesUseCase {
  private readonly preferences = inject(UserPreferencesRepository);

  execute(): UserPreferences {
    return this.preferences.load();
  }
}
