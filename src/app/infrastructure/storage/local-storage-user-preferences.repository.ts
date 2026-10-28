import { Injectable, inject } from '@angular/core';

import { UserPreferences } from '../../domain/entities/user-preferences';
import { UserPreferencesRepository } from '../../domain/repositories/user-preferences.repository';
import { TemperatureUnit } from '../../domain/value-objects/temperature';
import { ThemeMode } from '../../domain/value-objects/theme-mode';
import { SafeLocalStorage } from './safe-local-storage';

interface StoredPreferences {
  theme?: unknown;
  temperatureUnit?: unknown;
}

/** Implementação da porta `UserPreferencesRepository` com localStorage. */
@Injectable()
export class LocalStorageUserPreferencesRepository extends UserPreferencesRepository {
  private static readonly STORAGE_KEY = 'weather-dashboard:preferences:v1';

  private readonly storage = inject(SafeLocalStorage);

  override load(): UserPreferences {
    const stored = this.readStored();
    const theme = this.isTheme(stored.theme) ? stored.theme : this.systemTheme();
    const unit = this.isUnit(stored.temperatureUnit) ? stored.temperatureUnit : 'celsius';

    return new UserPreferences(theme, unit);
  }

  override save(preferences: UserPreferences): void {
    this.storage.write(
      LocalStorageUserPreferencesRepository.STORAGE_KEY,
      JSON.stringify({ theme: preferences.theme, temperatureUnit: preferences.temperatureUnit }),
    );
  }

  private readStored(): StoredPreferences {
    const raw = this.storage.read(LocalStorageUserPreferencesRepository.STORAGE_KEY);

    if (!raw) {
      return {};
    }

    try {
      const parsed: unknown = JSON.parse(raw);
      return typeof parsed === 'object' && parsed !== null ? (parsed as StoredPreferences) : {};
    } catch {
      return {};
    }
  }

  /** Na primeira visita, respeita o tema do sistema operacional. */
  private systemTheme(): ThemeMode {
    const prefersDark =
      typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  private isTheme(value: unknown): value is ThemeMode {
    return value === 'light' || value === 'dark';
  }

  private isUnit(value: unknown): value is TemperatureUnit {
    return value === 'celsius' || value === 'fahrenheit';
  }
}
