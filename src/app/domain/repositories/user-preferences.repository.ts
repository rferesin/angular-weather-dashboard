import { UserPreferences } from '../entities/user-preferences';

/** Porta: persistência das preferências do usuário (tema e unidade). */
export abstract class UserPreferencesRepository {
  abstract load(): UserPreferences;
  abstract save(preferences: UserPreferences): void;
}
